import React, { useState, useEffect } from 'react';
import {
  TextInput, View, StyleSheet, Image, TouchableOpacity, Text, 
  KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firebaseAuth from '@react-native-firebase/auth';
import DashboardScreen from './DashboardScreen';
const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '75712864116-96qe3fdkqs6d0m9s93qbnvu4fjsbuka0.apps.googleusercontent.com',
    });
  }, []);

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      setIsLoggedIn(true);
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  const connectWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = firebaseAuth.GoogleAuthProvider.credential(idToken);
      await firebaseAuth().signInWithCredential(googleCredential);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

 
  if (isLoggedIn) {
    return <DashboardScreen />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={handleEmailLogin} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

      
         <TouchableOpacity onPress={connectWithGoogle} style={styles.googleButton}>
          <Text style={styles.buttonText}>Connect with Google</Text>
        </TouchableOpacity>
        <Text
          style={styles.forgotPassword}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          Forgot password?
        </Text>
        <View style={styles.signupPrompt}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate('Register')}
          >
            Sign up
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef9f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 50,
    borderColor: '#5E8D93',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  googleButton: {
    backgroundColor: '#DB4437', // Google's color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#5E8D93',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#5E8D93',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '700',
  },
  signupPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#5E8D93',
    fontSize: 16,
  },
  signupLink: {
    color: '#5E8D93',
    fontWeight: '700',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export const loginStyles = {
  container: {
    flex: 1,
    backgroundColor: '#eef9f0',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 60,
  },
  logo: {
    width: '170%',
    height: '170%',
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 2,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  // title: {
  //   fontSize: 26,
  //   fontWeight: '600',
  //   marginBottom: 8,
  //   color: '#5E8D93',
  //   textAlign: 'center',
  // },
  input: {
    backgroundColor: 'transparent', // No background
    height: 58,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    borderRadius: 50,
    paddingVertical: 2,
    backgroundColor: '#5E8D93',
    elevation: 4, // Subtle shadow on Android
    shadowColor: '#34495E', // Shadow for iOS
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
  forgotPassword: {
    marginTop: 12,
    textAlign: 'center',
    color: '#5E8D93',
    fontWeight: '700',
  },
  signupPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#5E8D93',
    fontSize: 16,
  },
  signupLink: {
    color: '#5E8D93',
    fontWeight: '700',
    fontSize: 16,
    textDecorationLine: 'underline',
  }
}

export default HomeScreen;

// import * as React from 'react';
// import  { useState, useEffect } from 'react';
// import { TextInput, Button, Text } from 'react-native-paper';
// import { View, StyleSheet,Image, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import firebaseAuth from '@react-native-firebase/auth';
// //import DashboardScreen from './Dashboard';
// import { auth } from './firebase'; // Your Firebase auth import

// const HomeScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId: '75712864116-96qe3fdkqs6d0m9s93qbnvu4fjsbuka0.apps.googleusercontent.com',
//     });
//   }, []);

//   const handleEmailLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       setIsLoggedIn(true);
//     } catch (error) {
//       Alert.alert('Login Error', error.message);
//     }
//   };

//   const connectWithGoogle = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const { idToken } = await GoogleSignin.signIn();
//       const googleCredential = firebaseAuth.GoogleAuthProvider.credential(idToken);
//       await firebaseAuth().signInWithCredential(googleCredential);
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // if (isLoggedIn) {
//   //   return <DashboardScreen />;
//   // }

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       {/* <View style={styles.logoContainer}>
//        <Image source={require('./assets/logo.png')} style={styles.logo} />
//       </View> */}
//       <View style={styles.formContainer}>
//         {/* <Text style={styles.title}>Welcome Back</Text> */}
//         <TextInput
//           label="Email"
//           mode="flat" // Flat design without borders
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
//           onPress={handleEmailLogin}
//           style={styles.button}
//           labelStyle={styles.buttonLabel}
//         >
//           Sign In
//         </Button>
//         <Text
//           style={styles.forgotPassword}
//           onPress={() => navigation.navigate('ForgotPassword')}
//         >
//           Forgot password?
//         </Text>
//         <View style={styles.signupPrompt}>
//           <Text style={styles.signupText}>Don't have an account? </Text>
//           <Text
//             style={styles.signupLink}
//             onPress={() => navigation.navigate('Signup')}
//           >
//             Sign up
//           </Text>
//         </View>
     
//       </View>
//     </KeyboardAvoidingView>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#eef9f0',
//   },
//   logoContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     marginTop: 60,
//   },
//   logo: {
//     width: '170%',
//     height: '170%',
//     resizeMode: 'contain',
//   },
//   formContainer: {
//     flex: 2,
//     paddingHorizontal: 30,
//     justifyContent: 'center',
//   },
//   // title: {
//   //   fontSize: 26,
//   //   fontWeight: '600',
//   //   marginBottom: 8,
//   //   color: '#5E8D93',
//   //   textAlign: 'center',
//   // },
//   input: {
//     backgroundColor: 'transparent', // No background
//     height: 58,
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   button: {
//     borderRadius: 50,
//     paddingVertical: 2,
//     backgroundColor: '#5E8D93',
//     elevation: 4, // Subtle shadow on Android
//     shadowColor: '#34495E', // Shadow for iOS
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
//   forgotPassword: {
//     marginTop: 12,
//     textAlign: 'center',
//     color: '#5E8D93',
//     fontWeight: '700',
//   },
//   signupPrompt: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   signupText: {
//     color: '#5E8D93',
//     fontSize: 16,
//   },
//   googleButton: {
//    backgroundColor: '#5E8D93', // Google's color
//     marginTop: 12, // Spacing from the sign-in button
//     // Add other styling as needed to match your design
//   },
//   signupLink: {
//     color: '#5E8D93',
//     fontWeight: '700',
//     fontSize: 16,
//     textDecorationLine: 'underline',
//   },
// });

// export const loginStyles = {
//   container: {
//     flex: 1,
//     backgroundColor: '#eef9f0',
//   },
//   logoContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     marginTop: 60,
//   },
//   logo: {
//     width: '170%',
//     height: '170%',
//     resizeMode: 'contain',
//   },
//   formContainer: {
//     flex: 2,
//     paddingHorizontal: 30,
//     justifyContent: 'center',
//   },
//   // title: {
//   //   fontSize: 26,
//   //   fontWeight: '600',
//   //   marginBottom: 8,
//   //   color: '#5E8D93',
//   //   textAlign: 'center',
//   // },
//   input: {
//     backgroundColor: 'transparent', // No background
//     height: 58,
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   button: {
//     borderRadius: 50,
//     paddingVertical: 2,
//     backgroundColor: '#5E8D93',
//     elevation: 4, // Subtle shadow on Android
//     shadowColor: '#34495E', // Shadow for iOS
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
//   forgotPassword: {
//     marginTop: 12,
//     textAlign: 'center',
//     color: '#5E8D93',
//     fontWeight: '700',
//   },
//   signupPrompt: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   signupText: {
//     color: '#5E8D93',
//     fontSize: 16,
//   },
//   signupLink: {
//     color: '#5E8D93',
//     fontWeight: '700',
//     fontSize: 16,
//     textDecorationLine: 'underline',
//   }
// }

// export default HomeScreen


