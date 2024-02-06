import React, { useState } from 'react';
import { View, Image, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import {getAuth,createUserWithEmailAndPassword} from '@react-native-firebase/auth';
import DashboardScreen from './DashboardScreen'; // Import your DashboardScreen
import { loginStyles } from './HomeScreen'; // Assuming you have a loginStyles object
//import { app } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase'; // Import db from your firebase.js
//import UserModel from './UserModel';


const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [dob, setDob] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const auth = getAuth();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      

      const newUser = new UserModel(fullName, dob, country);

      // Storing additional user details in Firestore
      await setDoc(doc(db, "users", user.uid), newUser.toFirestore());

      console.log('Signup and user data storage successful');
      navigation.navigate('Dashboard'); // Navigate to Dashboard after successful signup
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert("Signup Error", error.message);
    }
  };


  if (isSignedUp) {
    return <DashboardScreen />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ ...loginStyles.container, ...styles.container }}
    >
      {/* <View style={styles.logoContainer}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
      </View> */}
      <View style={styles.formContainer}>
        <TextInput
          label="Full Name"
          mode="flat"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          underlineColor="#5E8D93"
          theme={{ colors: { primary: '#5E8D93', underlineColor: 'transparent' } }}
        />
        <TextInput
          label="Country"
          mode="flat"
          value={country}
          onChangeText={setCountry}
          style={styles.input}
          underlineColor="#5E8D93"
          theme={{ colors: { primary: '#5E8D93', underlineColor: 'transparent' } }}
        />
        <TextInput
          label="Date of Birth"
          mode="flat"
          value={dob}
          onChangeText={setDob}
          style={styles.input}
          underlineColor="#5E8D93"
          theme={{ colors: { primary: '#5E8D93', underlineColor: 'transparent' } }}
        />
        <TextInput
          label="Email"
          mode="flat"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          underlineColor="#5E8D93"
          theme={{ colors: { primary: '#5E8D93', underlineColor: 'transparent' } }}
        />
        <TextInput
          label="Password"
          mode="flat"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          underlineColor="#5E8D93"
          theme={{ colors: { primary: '#5E8D93', underlineColor: 'transparent' } }}
        />
        <Button
          mode="contained"
          onPress={handleSignup}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Sign Up
        </Button>
        <Text style={styles.switchText} onPress={() => navigation.navigate('Login')}>
          Already have an account? Login
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eef9f0',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 60,
  },
  logo: {
    marginTop: -120,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 2,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'transparent',
    height: 58,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    borderRadius: 50,
    paddingVertical: 2,
    backgroundColor: '#5E8D93',
    elevation: 4,
    shadowColor: '#34495E',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonLabel: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 26,
  },
  switchText: {
    marginTop: 20,
    color: 'blue',
  },
});

export default RegisterScreen;



