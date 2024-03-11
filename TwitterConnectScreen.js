import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, SafeAreaView, Text, Alert } from 'react-native';
import { Appbar } from 'react-native-paper';

const TwitterConnectScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  const fetchUserData = async (enteredUsername) => {
    const apiURL = `http://192.168.137.181/twitter/api.php?username=${enteredUsername}`;
    try {
      const response = await fetch(apiURL);
      if (response.ok) { // Check if status code is 200
        const data = await response.json();
        console.log("Data received from API:", data);
        // Handle the fetched data here. For example, navigate to a new screen and pass this data.
        // navigation.navigate('UserDataScreen', { userData: data });
        Alert.alert('Success', 'Data fetched successfully.', [{ text: 'OK' }]);
      } else {
        console.error(`Error: ${response.status}`);
        Alert.alert('Error', `Failed to fetch data: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
      Alert.alert('Error', 'Failed to fetch data from the API.');
    }
  };

  const handleConnect = () => {
    if (username.trim()) {
      fetchUserData(username.trim());
    } else {
      Alert.alert('Error', 'Please enter a valid username.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Connect to Twitter" style={styles.appbarTitle} />
      </Appbar.Header>
      <View style={styles.content}>
        <Text style={styles.label}>Enter your Twitter username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Twitter username"
        />
        <Button title="Connect" onPress={handleConnect} color="#1DA1F2" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef9f0',
  },
  appbar: {
    backgroundColor: '#eef9f0', 
    elevation: 0,
  },
  appbarTitle: {
    color: '#5E8D93',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#5E8D93',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  label: {
    marginBottom: 5,
    color: '#5E8D93',
  },
  // Add more styles as needed
});

export default TwitterConnectScreen;
