// import React, { useState } from 'react';
// import { View, Image, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
// import { TextInput, Button, Text } from 'react-native-paper';
// import {getAuth,createUserWithEmailAndPassword} from '@react-native-firebase/auth';
// import DashboardScreen from './DashboardScreen'; // Import your DashboardScreen
// import { loginStyles } from './HomeScreen'; // Assuming you have a loginStyles object
// //import { app } from './firebase';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from './firebase'; // Import db from your firebase.js
// //import UserModel from './UserModel';


// const RegisterScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [country, setCountry] = useState('');
//   const [dob, setDob] = useState('');
//   const [isSignedUp, setIsSignedUp] = useState(false);
//   const auth = getAuth();

//   const handleSignup = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
      

//       const newUser = new UserModel(fullName, dob, country);

//       // Storing additional user details in Firestore
//       await setDoc(doc(db, "users", user.uid), newUser.toFirestore());

//       console.log('Signup and user data storage successful');
//       navigation.navigate('Dashboard'); // Navigate to Dashboard after successful signup
//     } catch (error) {
//       console.error('Error signing up:', error);
//       Alert.alert("Signup Error", error.message);
//     }
//   };


//   if (isSignedUp) {
//     return <DashboardScreen />;
//   }

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={{ ...loginStyles.container, ...styles.container }}
//     >
//       {/* <View style={styles.logoContainer}>
//         <Image source={require('./assets/logo.png')} style={styles.logo} />
//       </View> */}
//       <View style={styles.formContainer}>
//         <TextInput
//           label="Full Name"
//           mode="flat"
//           value={fullName}
//           onChangeText={setFullName}
//           style={styles.input}
//           underlineColor="#5E8D93"
//           theme={{ colors: { primary: '#5E8D93', underlineColor: 'transparent' } }}
//         />
//         <TextInput
//           label="Country"
//           mode="flat"
//           value={country}
//           onChangeText={setCountry}
//           style={styles.input}
//           underlineColor="#5E8D93"
//           theme={{ colors: { primary: '#5E8D93', underlineColor: 'transparent' } }}
//         />
//         <TextInput
//           label="Date of Birth"
//           mode="flat"
//           value={dob}
//           onChangeText={setDob}
//           style={styles.input}
//           underlineColor="#5E8D93"
//           theme={{ colors: { primary: '#5E8D93', underlineColor: 'transparent' } }}
//         />
//         <TextInput
//           label="Email"
//           mode="flat"
//           value={email}
//           onChangeText={setEmail}
//           style={styles.input}
//           keyboardType="email-address"
//           underlineColor="#5E8D93"
//           theme={{ colors: { primary: '#5E8D93', underlineColor: 'transparent' } }}
//         />
//         <TextInput
//           label="Password"
//           mode="flat"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           style={styles.input}
//           underlineColor="#5E8D93"
//           theme={{ colors: { primary: '#5E8D93', underlineColor: 'transparent' } }}
//         />
//         <Button
//           mode="contained"
//           onPress={handleSignup}
//           style={styles.button}
//           labelStyle={styles.buttonLabel}
//         >
//           Sign Up
//         </Button>
//         <Text style={styles.switchText} onPress={() => navigation.navigate('Login')}>
//           Already have an account? Login
//         </Text>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#eef9f0',
//   },
//   logoContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     marginTop: 60,
//   },
//   logo: {
//     marginTop: -120,
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   formContainer: {
//     flex: 2,
//     paddingHorizontal: 30,
//     justifyContent: 'center',
//   },
//   input: {
//     backgroundColor: 'transparent',
//     height: 58,
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   button: {
//     borderRadius: 50,
//     paddingVertical: 2,
//     backgroundColor: '#5E8D93',
//     elevation: 4,
//     shadowColor: '#34495E',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   buttonLabel: {
//     fontWeight: '500',
//     fontSize: 18,
//     lineHeight: 26,
//   },
//   switchText: {
//     marginTop: 20,
//     color: 'blue',
//   },
// });

// export default RegisterScreen;


// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { db } from './firebase'; // Assuming you have Firebase Firestore configured
// import {  loginStyles } from './HomeScreen'; // Importing shared styles

// const RegisterScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [country, setCountry] = useState('');
//   const [dob, setDob] = useState('');

//   const handleSignup = async () => {
//     try {
//       const userCredential = await auth().createUserWithEmailAndPassword(email, password);
//       const user = userCredential.user;

//       // Storing additional user details in Firestore
//       await db.collection('users').doc(user.uid).set({
//         fullName: fullName,
//         country: country,
//         dob: dob,
//       });

//       console.log('Signup and user data storage successful');
//       navigation.navigate('Dashboard'); // Navigate to Dashboard after successful signup
//     } catch (error) {
//       console.error('Error signing up:', error);
//       Alert.alert("Signup Error", error.message);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={loginStyles.container}
//     >
//       <View style={loginStyles.formContiner}>
//         <TextInput
//           label="Full Name"
//           value={fullName}
//           onChangeText={setFullName}
//           style={loginStyles.input}
//           placeholder="Full Name"
//         />
//         <TextInput
//           label="Country"
//           value={country}
//           onChangeText={setCountry}
//           style={loginStyles.input}
//           placeholder="Country"
//         />
//         <TextInput
//           label="Date of Birth"
//           value={dob}
//           onChangeText={setDob}
//           style={loginStyles.input}
//           placeholder="Date of Birth"
//         />
//         <TextInput
//           label="Email"
//           value={email}
//           onChangeText={setEmail}
//           style={loginStyles.input}
//           keyboardType="email-address"
//           placeholder="Email"
//         />
//         <TextInput
//           label="Password"
//           value={password}
//           onChangeText={setPassword}
//           style={loginStyles.input}
//           secureTextEntry
//           placeholder="Password"
//         />
//         <Button
//           title="Sign Up"
//           onPress={handleSignup}
//           style={loginStyles.button}
//           labelStyle={loginStyles.buttonLabel}
//         />
//         <Text style={loginStyles.signupText} onPress={() => navigation.navigate('Login')}>
//           Already have an account? Login
//         </Text>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default RegisterScreen;

import React, { useState } from 'react';
import { View, Image, KeyboardAvoidingView, Platform, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
// Import Firebase services
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Assuming DashboardScreen and loginStyles are correctly imported
import DashboardScreen from './DashboardScreen';
import { loginStyles } from './HomeScreen';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [dob, setDob] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSignup = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Assuming you have a UserModel class or similar logic for structuring user data
      const newUser = {
        fullName, dob, country
      };

      // Storing additional user details in Firestore
      await firestore().collection('users').doc(user.uid).set(newUser);

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
      <View style={styles.logoContainer}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
      </View>
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
          theme={{ colors: { primary: '#3868D9', underlineColor: 'transparent' } }}
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
    backgroundColor: '#ffffff',
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
  switchText: {
    marginTop: 20,
    color: 'blue',
  },
});

export default RegisterScreen;

