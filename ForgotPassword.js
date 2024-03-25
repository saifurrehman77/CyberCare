import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import {TextInput, Button, Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  // Function to handle the password reset request
  const handleResetPassword = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          "Check your email",
          "A link to reset your password has been sent to your email address."
        );
      })
      .catch((error) => {
        const errorMessage = error.message;
        // Handle errors here
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Forgot Password</Text>
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
        <Button
          mode="contained"
          onPress={handleResetPassword}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Reset Password
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 8,
    color: '#3868D9',
    textAlign: 'center',
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
    backgroundColor: '#3868D9',
    elevation: 4,
    shadowColor: '#3868D9',
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
});

export default ForgotPassword;
