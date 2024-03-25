import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ProfileSettings = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const user = auth().currentUser;

  const handleChangePassword = async () => {
    if (user && password) {
      auth()
        .currentUser.updatePassword(password)
        .then(() => {
          Alert.alert("Success", "Password updated successfully");
        })
        .catch((error) => {
          console.error('Error updating password:', error);
          Alert.alert("Error", error.message);
        });
    }
  };

  const handleSavePersonalInfo = async () => {
    if (user) {
      firestore()
        .collection("users")
        .doc(user.uid)
        .update({
          fullName,
          country,
        })
        .then(() => {
          Alert.alert("Success", "Personal information updated successfully");
        })
        .catch((error) => {
          console.error('Error updating personal information:', error);
          Alert.alert("Error", error.message);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Password Update Card */}
          <Card style={styles.card}>
            <Card.Content>
              <Title>Change Password</Title>
              <TextInput
                label="New Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                theme={{ colors: { primary: '#3868D9' } }}
              />
              <Button mode="contained" onPress={handleChangePassword} style={styles.button}>
                Update Password
              </Button>
            </Card.Content>
          </Card>

          {/* Personal Information Update Card */}
          <Card style={styles.card}>
            <Card.Content>
              <Title>Personal Information</Title>
              <TextInput
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
                theme={{ colors: { primary: '#3868D9' } }}
              />
              <TextInput
                label="Country"
                value={country}
                onChangeText={setCountry}
                style={styles.input}
                theme={{ colors: { primary: '#3868D9' } }}
              />
              <Button mode="contained" onPress={handleSavePersonalInfo} style={styles.button}>
                Save Changes
              </Button>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 8,
    elevation: 4,
  },
  input: {
    backgroundColor: 'transparent',
    marginBottom: 16,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#3868D9',
  },
});

export default ProfileSettings;
