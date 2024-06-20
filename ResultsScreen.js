import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';
import {List} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import {useUser} from './userContext';

const {width: screenWidth} = Dimensions.get('window');

const ResultsScreen = ({route, navigation}) => {
  const [username, setUsername] = useState('');
  const [isLoading, setLoading] = useState({
    'Content Monitoring': false,
    'Bullying Statistics': false,
    'Personality Traits': false,
    'Sentiment Analysis': false,
    'Friend List Analyzer': false,
  });
  const [loadingMessage, setLoadingMessage] = useState('');
  const {
    isfetchUserStatusAndComments,
    setisfetchUserStatusAndComments,
    setcontentcombinedresults,
    isfetchUserDataforBullying,
    setisfetchUserDataforBullying,
  } = useUser();

  const getStartDate = filterType => {
    const today = new Date();
    console.log('Original date:', today.toISOString());
    switch (filterType) {
      case 'lastWeek':
        today.setDate(today.getDate() - 7);
        break;
      case 'last2Weeks':
        today.setDate(today.getDate() - 14);
        break;
      case 'lastMonth':
        today.setMonth(today.getMonth() - 1);
        break;
      case 'overall':
        return null;
    }
    console.log(
      'Modified date for filterType',
      filterType,
      ':',
      today.toISOString(),
    );
    return today;
  };

  const formatDate = date => {
    if (!date) return ''; // Properly handle 'overall' case if needed
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
  };

  useEffect(() => {
    console.log('In Use Effect', isfetchUserStatusAndComments);
    if (isfetchUserStatusAndComments) {
      fetchUserStatusAndComments(isfetchUserStatusAndComments);
    }
  }, [isfetchUserStatusAndComments]);

  useEffect(() => {
    console.log('In Use Effect for Bullying', isfetchUserDataforBullying);
    if (isfetchUserDataforBullying) {
      fetchUserDataAndProcessforBullying(isfetchUserDataforBullying);
    }
  }, [isfetchUserDataforBullying]);

  const user = route.params?.user;
  console.log(user);

  const tweetcount = route.params?.tweetcount;
  console.log(tweetcount);

  const fetchUserDataAndProcessforBullying = async filterType => {
    console.log('Fetching data for:', filterType);
    setUsername(route.params.username);
    const startDate = getStartDate(filterType);
    const formattedDate = formatDate(startDate);
    console.log('Formatted Date', formattedDate);

    const apiURL =
      `http://10.113.71.44/twitter/api.php?username=${username.trim()}` +
      (formattedDate ? `&startDate=${formattedDate}` : '');
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        console.error(`API Error: ${response.status}`);
        Alert.alert('Error', `Failed to fetch data: ${response.statusText}`);
        return;
      }
      const jsonResponse = await response.json();
      console.log('API Response:', jsonResponse);

      await firestore()
        .collection('rawData')
        .doc('apiResponse')
        .set(jsonResponse);
      console.log(jsonResponse.data);

      const commentsAndReplies = jsonResponse.data.tweets.flatMap(post =>
        post.comments.flatMap(comment => [
          comment.comment,
          ...comment.replies
            .map(reply => reply.reply)
            .filter(replyText => replyText != null),
        ]),
      );

      const validCommentsAndReplies = commentsAndReplies.filter(
        text => typeof text === 'string',
      );
      console.log('Comments:', validCommentsAndReplies);

      const hateSpeechResults = await processDataWithModel(
        validCommentsAndReplies,
        'hateSpeech',
      );
      const racismResults = await processDataWithModel(
        validCommentsAndReplies,
        'racism',
      );
      const sexismResults = await processDataWithModel(
        validCommentsAndReplies,
        'sexism',
      );

      console.log({
        hateSpeechResults,
        racismResults,
        sexismResults,
      });

      await firestore()
        .collection('analysisResults')
        .doc(username)
        .set({hateSpeechResults, racismResults, sexismResults});

      navigation.navigate('Bullying and Harassment', {
        validCommentsAndReplies,
        combinedResults: {hateSpeechResults, racismResults, sexismResults},
      });
    } catch (error) {
      //console.error(`Fetching Error for Content Monitoring:`, error);
    }
  };

  const fetchUserStatusAndComments = async filterType => {
    console.log('Fetching data for:', filterType);
    setUsername(route.params.username);
    const startDate = getStartDate(filterType);
    const formattedDate = formatDate(startDate);
    console.log('Formatted Date', formattedDate);

    const apiURL =
      `http://10.113.71.44/twitter/api.php?username=${username.trim()}` +
      (formattedDate ? `&startDate=${formattedDate}` : '');










     


    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        console.error(`API Error: ${response.status}`);
        Alert.alert('Error', `Failed to fetch data: ${response.statusText}`);
        return;
      }
      const jsonResponse = await response.json();
      console.log('API Response:', jsonResponse);

      const userStatuses = jsonResponse.data.tweets
        .map(post => post.status)
        .filter(status => status != null);
      const userComments = jsonResponse.data.tweets.flatMap(post =>
        post.comments
          .filter(comment => comment.user_id === jsonResponse.data.user.id)
          .map(comment => comment.comment),
      );
      const userContent = [...userStatuses, ...userComments];

      console.log('User Content:', userContent);

      const hateSpeechResults = await processDataWithModel(
        userContent,
        'hateSpeech',
      );
      const racismResults = await processDataWithModel(userContent, 'racism');
      const sexismResults = await processDataWithModel(userContent, 'sexism');

      await firestore()
        .collection('userContentAnalysisResults')
        .doc(username)
        .set({hateSpeechResults, racismResults, sexismResults});

      console.log('Content Results:', {
        hateSpeechResults,
        racismResults,
        sexismResults,
      });

      navigation.navigate('Content Monitoring', {
        contentcombinedResults: {
          hateSpeechResults,
          racismResults,
          sexismResults,
        },
      });
    } catch (error) {
      //console.error(`Fetching Error for Bullying and Harrasment:`, error);
    }
  };

  const fetchUserPersonalityTraits = async () => {
    console.log('Hey how are you');
    setUsername(route.params.username);
    const apiURL = `http://10.113.71.44/twitter/api.php?username=${username.trim()}`;
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        console.error(`API Error: ${response.status}`);
        Alert.alert('Error', `Failed to fetch data: ${response.statusText}`);
        return;
      }
      const jsonResponse = await response.json();
      console.log('API Response:', jsonResponse);

      const userStatuses = jsonResponse.data.tweets
        .map(post => post.status)
        .filter(status => status != null);
      const userComments = jsonResponse.data.tweets.flatMap(post =>
        post.comments
          .filter(comment => comment.user_id === jsonResponse.data.user.id)
          .map(comment => comment.comment),
      );
      const userContent = [...userStatuses, ...userComments];
      console.log('User Content:', userContent);

      const personalityResults = await processDataWithModel(
        userContent,
        'personality',
      );

      await firestore()
        .collection('userContentAnalysisResults')
        .doc(username)
        .set({personalityResults});
      console.log('personalityResults', {personalityResults});

      console.log('Navigating with userContent:', userContent);
      navigation.navigate('Personality Trait Analysis', {
        userContent,
        combinedpersonalityResults: {personalityResults},
      });
    } catch (error) {
      console.error(`Fetching Error for Personality Traits:`, error);
      Alert.alert('Error', 'Failed to fetch data from the API.');
    }
  };

  const fetchUserSentiments = async () => {
    console.log('Hey how are you');
    setUsername(route.params.username);
    const apiURL = `http://10.113.71.44/twitter/api.php?username=${username.trim()}`;
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        console.error(`API Error: ${response.status}`);
        Alert.alert('Error', `Failed to fetch data: ${response.statusText}`);
        return;
      }
      const jsonResponse = await response.json();
      console.log('API Response:', jsonResponse);

      const userStatuses = jsonResponse.data.tweets
        .map(post => post.status)
        .filter(status => status != null);
      const userComments = jsonResponse.data.tweets.flatMap(post =>
        post.comments
          .filter(comment => comment.user_id === jsonResponse.data.user.id)
          .map(comment => comment.comment),
      );
      const userContent = [...userStatuses, ...userComments];
      console.log('User Content:', userContent);

      const sentimentResults = await processDataWithModel(
        userContent,
        'sentiments',
      );

      await firestore()
        .collection('userContentAnalysisResults')
        .doc(username)
        .set({sentimentResults});
      console.log('sentimentResults', {sentimentResults});

      console.log('Navigating with userContent:', userContent);
      navigation.navigate('Sentiments Screen', {
        userContent,
        combinedsentimentResults: {sentimentResults},
      });
    } catch (error) {
      console.error(`Fetching Error for User Sentiments:`, error);
      Alert.alert('Error', 'Failed to fetch data from the API.');
    }
  };

  const fetchFriendListData = async () => {
    console.log('Hey how are you');
    const apiURL = `http://10.113.71.44/twitter/getfollowing.php?username=${username.trim()}`;
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        console.error(`API Error: ${response.status}`);
        Alert.alert('Error', `Failed to fetch data: ${response.statusText}`);
        return;
      }
      const jsonResponse = await response.json();
      console.log('Friend List Response:', jsonResponse);

      navigation.navigate('Friends Screen', {data: jsonResponse}); // Navigate and pass data
    } catch (error) {
      console.error(`Fetching Error for Friends Screen:`, error);
      Alert.alert('Error', 'Failed to fetch data from the API.');
    }
  };

  const API_URLS = {
    hateSpeech: 'http://10.113.71.44:8000/predict/hatespeech',
    racism: 'http://10.113.71.44:8000/predict/racism',
    sexism: 'http://10.113.71.44:8000/predict/sexism',
    personality: 'http://10.113.71.44:8000/personalitytraits/',
    sentiments: 'http://10.113.71.44:8000/sentimentanalysis/',
  };

  const processDataWithModel = async (contents, modelType) => {
    try {
      const response = await fetch(API_URLS[modelType], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({comments: contents}),
      });

      if (response.ok) {
        const results = await response.json();
        console.log(
          `Successfully processed content with ${modelType}:`,
          results,
        );
        return results;
      } else {
        console.error(
          `API Error (${modelType}): ${response.status}`,
          await response.text(),
        );
        Alert.alert(
          'Error',
          `Failed to process content with ${modelType}: ${response.statusText}`,
        );
      }
    } catch (error) {
      console.error(`Error processing with ${modelType}:`, error);
      Alert.alert('Error', `Failed to process content with ${modelType}.`);
    }
  };

  const handlePress = async (message, action) => {
    setLoadingMessage(message);
    setLoading(true);
    try {
      await action();
    } catch (error) {
      console.error('Failed to complete the action: ', error);
    }
    setLoading(false);
  };

  const buttons = [
    {
      icon: require('./assets/content.png'),
      title: 'Content Monitoring',
      description: 'Monitor your Child Content.',
      onPress: () => fetchUserStatusAndComments('overall'),
      loadingMessage: 'Processing Content Monitoring...',
    },
    {
      icon: require('./assets/bullying.png'),
      title: 'Bullying Statistics',
      description: 'Analyze Bullying & Harassment Statistics.',
      onPress: () => fetchUserDataAndProcessforBullying('overall'),
      loadingMessage: 'Processing Bullying and Harrasment...',
    },
    {
      icon: require('./assets/personality.png'),
      title: 'Personality Traits',
      description: 'Analyze your child personality traits.',
      onPress: () => fetchUserPersonalityTraits(),
      loadingMessage: 'Processing Personality Traits...',
    },
    {
      icon: require('./assets/sentiment.png'),
      title: 'Sentiment Analysis',
      description: 'Analyze your Child Sentiments.',
      onPress: () => fetchUserSentiments(),
      loadingMessage: 'Processing Sentiments...',
    },
    {
      icon: require('./assets/friend.png'),
      title: 'Friend List Analyzer',
      description: 'Analyze the friend list.',
      onPress: () => fetchFriendListData(),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Cyber Care</Text>
      <View style={styles.buttonContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handlePress(button.loadingMessage, button.onPress)}>
            <LinearGradient
              colors={['#4c669f', '#3b5998', '#192f6a']}
              style={styles.gradient}>
              <Image source={button.icon} style={styles.icon} />
              <Text style={styles.buttonTitle}>{button.title}</Text>
              <Text style={styles.buttonDescription}>{button.description}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
      <ProfileCard user={user} tweetcount={tweetcount?.length} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLoading}
        onRequestClose={() => {
          setIsLoading(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.modalText}>{loadingMessage}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ProfileCard = ({user, tweetcount}) => {
  const [showDetails, setShowDetails] = useState(false);
  const rotateY = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(rotateY.value, [0, 180], [0, -180], 'clamp');
    return {
      transform: [{perspective: 1000}, {rotateY: `${rotate}deg`}],
      opacity: rotateY.value <= 90 ? 1 : 0,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(rotateY.value, [0, 180], [180, 0], 'clamp');
    return {
      transform: [{perspective: 1000}, {rotateY: `${rotate}deg`}],
      opacity: rotateY.value > 90 ? 1 : 0,
    };
  });

  const handlePress = () => {
    setShowDetails(!showDetails);
    rotateY.value = withSpring(showDetails ? 0 : 180, {
      damping: 10,
      stiffness: 100,
    });
  };

  return (
    <>
      <View style={{marginTop: 20, alignItems: 'center'}}>
        <TouchableOpacity activeOpacity={1} onPress={handlePress}>
          <Animated.View style={[styles.card, frontAnimatedStyle]}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('./assets/download.png')} // Fallback to a placeholder if user.img is not available
              />
            </View>
            <View style={styles.info}>
              <Text style={[styles.name]}>{user.name}</Text>
              <Text style={[styles.detail]}>{user.email}</Text>
              <Text style={[styles.detail]}>Tweets: {tweetcount}</Text>
            </View>
          </Animated.View>

          <Animated.View
            style={[styles.card, backAnimatedStyle, styles.cardBack]}>
            <View style={styles.info}>
              <View style={styles.iconRow}>
                <List.Icon color="#1DA1F2" icon="twitter" />
                <Text style={[styles.detail, styles.twitterId]}>
                  {user.username}
                </Text>
              </View>
              <View style={styles.iconRow}>
                <List.Icon color="#333" icon="account" />
                <Text style={[styles.detail, styles.bio]}>{user.bio}</Text>
              </View>
              <View style={styles.iconRow}>
                <List.Icon color="#FF6347" icon="map-marker" />
                <Text style={[styles.detail, styles.location]}>
                  {user.location}
                </Text>
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: 'white', // Adjusted for consistency with your screenshot
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -40,
    color: '#4c669f',
  },
  text: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: -70, // Give some space before the buttons
  },
  smallText: {
    fontWeight: '800',
    fontSize: 16,
    color: '#3868D9',
    marginBottom: 10, // Space before the buttons
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    padding: 10, // Padding around the button area for spacing
  },
  button: {
    backgroundColor: '#4c669f',
    width: '45%', // Adjust width for better spacing
    padding: 10,
    borderRadius: 20, // Increased radius for rounded corners
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.3, // Increased opacity for more visible shadow
    shadowRadius: 6, // Increased radius for a softer shadow
    elevation: 8, // Increased elevation for more pronounced shadow on Android
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  buttonTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonDescription: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  gradient: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 20, // Ensure gradient also has rounded corners
    width: '100%', // Ensure gradient fills the button
  },
  logo: {
    height: 20, // Adjust the height accordingly
    width: screenWidth * 0.85, // Same width as the cards for consistency
    marginTop: -29, // Add some top margin
  },

  chartContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 16,
    width: '90%',
    padding: 10,
    marginTop: 10,
    color: 'black',
    backgroundColor: '#ffffff', // Background color is needed for iOS shadow to be visible
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0, // Horizontal shadow offset
      height: 4, // Vertical shadow offset
    },
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 6, // Shadow blur radius
    elevation: 3, // Elevation for Android shadow
  },

  card: {
    backgroundColor: '#d4e0fc',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: screenWidth * 0.85,
    minHeight: 300,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    backfaceVisibility: 'hidden', // Hide the back of the card when it is flipped
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#f2f2f2',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  info: {
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
    color: '#333',
  },
  detail: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  cardBack: {
    backgroundColor: '#ffffff', // you might want to change the background color for the back card
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.85,
    minHeight: 300,
    position: 'absolute',
    top: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    backfaceVisibility: 'hidden',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  twitterId: {
    fontSize: 16,
    color: '#1DA1F2',
    marginLeft: 10,
  },
  bio: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  location: {
    fontSize: 16,
    color: '#FF6347',
    marginLeft: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  button: {
    width: '45%', // Adjust width accordingly
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  loadingIndicator: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: screen.width,
    height: screen.height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // This ensures the modal covers the whole screen
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginTop: 15,
    textAlign: 'center',
  },
});

export default ResultsScreen;
