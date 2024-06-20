import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons from react-native-vector-icons

const FriendsScreen = ({route, navigation}) => {
  const {data} = route.params;

  const fetchUserStatusAndComments = async (username, modelType) => {
    const apiURL = `http://10.113.71.44/twitter/api.php?username=${username.trim()}`;

    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        console.error(`API Error: ${response.status}`);
        Alert.alert('Error', `Failed to fetch data: ${response.statusText}`);
        return;
      }
      const jsonResponse = await response.json();
      console.log('Full API Response:', jsonResponse);

      const statusArray = jsonResponse.data.tweets.map(tweet => tweet.status);
      if (statusArray.length === 0) {
        console.log('No statuses found for this user.');
      } else {
        console.log('Status Array:', statusArray);
        const personalityResults = await processDataWithModel(
          statusArray,
          modelType,
        );
        console.log('Processing Results:', personalityResults);
        navigation.navigate('Following Results', {
          combinedpersonalityResults: {personalityResults},
        });
      }
    } catch (error) {
      console.error('Failed to fetch user status:', error);
      Alert.alert(
        'Error',
        `Failed to fetch user status due to an error: ${error.message}`,
      );
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => fetchUserStatusAndComments(item.username, 'personality')}>
      <Text style={styles.itemText}>{item.name}</Text>
      <View>
        <Icon name="eye" size={24} color="#333" />
      </View>
    </TouchableOpacity>
  );

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
        return null;
      }
    } catch (error) {
      console.error(`Error processing with ${modelType}:`, error);
      Alert.alert('Error', `Failed to process content with ${modelType}.`);
      return null;
    }
  };

  const API_URLS = {
    personality: 'http://10.113.71.44:8000/personalitytraits/',
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  itemContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default FriendsScreen;
