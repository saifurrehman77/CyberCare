import React, {useState} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Text,
  Alert,
} from 'react-native';
import {Appbar, Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const TwitterConnectScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUserDataAndProcess = async () => {
    const apiURL = `http://10.113.71.44/twitter/api.php?username=${username.trim()}`;
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        console.error(`API Error: ${response.status}`);
        // Alert.alert(
        //   'Error',
        //   `Failed to fetch data atique: ${response.statusText}`,
        // );
        return;
      }
      const jsonResponse = await response.json();
      console.log('API Response:', jsonResponse);

      // Store raw JSON data in Firestore
      await firestore()
        .collection('rawData')
        .doc('apiResponse')
        .set(jsonResponse);
      console.log(jsonResponse.data);
      const user = jsonResponse.data.user;
      console.log(user);

      const totaltweets = jsonResponse.data.tweets
        .map(post => post.status)
        .filter(status => status != null);

      const tweetcount = [...totaltweets];
      console.log('Total Tweets', tweetcount);

      navigation.navigate('Result Screen', {
        tweetcount,
        user,
        username,
        // combinedResults: {hateSpeechResults, racismResults, sexismResults},
      });
    } catch (error) {
      console.error(`Fetching Error for twitter screen:`, error);
      //Alert.alert('Error', 'Failed to fetch data from the API. basit');
    }
  };

  const handleConnect = () => {
    if (username.trim()) {
      setLoading(true); // Start loading
      Promise.all([
        fetchUserDataAndProcess(),
        // fetchUserStatusAndComments(),
        // fetchUserDataAndProcessforBullying(),
        // fetchUserPersonalityTraits()
      ])
        .then(() => {
          setLoading(false); // Stop loading
          // Handle successful data fetching and processing here, e.g., navigation
        })
        .catch(error => {
          setLoading(false); // Stop loading on error
          // Alert.alert('Error', 'Failed to fetch or process data.'); // Show error message
          console.error(error);
        });
    } else {
      Alert.alert('Error', 'Please enter a valid username.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        {/* <Appbar.BackAction onPress={() => navigation.goBack()} /> */}
        {/* <Appbar.Content title="Connect to Twitter" titleStyle={styles.appbarTitle} /> */}
      </Appbar.Header>
      <View style={styles.formContainer}>
        <FontAwesome5
          name="twitter"
          size={180}
          color="#1DA1F2"
          style={styles.icon}
        />
        <Text style={styles.label}>Enter your Twitter Username</Text>
        <TextInput
          mode="flat"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholder="Enter Username"
          underlineColor="#3868D9"
          theme={{colors: {primary: '#3868D9', underlineColor: 'transparent'}}}
        />
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#3868D9"
            style={{marginVertical: 20}}
          />
        ) : (
          <Button
            mode="contained"
            onPress={handleConnect}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            disabled={loading}>
            Connect
          </Button>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: -150,
  },
  icon: {
    textAlign: 'center',
    marginBottom: 20,
  },
  appbar: {
    backgroundColor: '#ffffff',
    elevation: 0, // Consider using a slight elevation or a borderBottomWidth for a subtle separation
  },
  appbarTitle: {
    color: '#3868D9',
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#3868D9',
  },
  input: {
    backgroundColor: '#f0f0f0', // Slightly off-white background for depth
    height: 58,
    marginBottom: 16,
    fontSize: 16,
    paddingHorizontal: 20, // Adjust padding to match design needs
    borderColor: '#3868D9',
    borderWidth: 1,
    borderRadius: 5,
    // Adding a subtle shadow to the input
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  button: {
    borderRadius: 50,
    paddingVertical: 10, // Increased padding for a better touch area
    backgroundColor: '#3868D9', // This will be overridden by gradient
    // More pronounced shadow for the button
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonLabel: {
    fontWeight: 'bold', // Bold font weight for better readability
    fontSize: 18,
    lineHeight: 26,
    color: '#ffffff', // Ensure text color contrasts well with button background
  },
});

export default TwitterConnectScreen;
