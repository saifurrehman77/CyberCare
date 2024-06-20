// import React, { useState, useEffect } from 'react';
// import {
//   TextInput, View, StyleSheet, Image, TouchableOpacity, Text,
//   KeyboardAvoidingView, Platform, Alert
// } from 'react-native';
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import firebaseAuth from '@react-native-firebase/auth';
// import DashboardScreen from './DashboardScreen';
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
//       await signInWithEmailAndPassword(getAuth(), email, password);
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

//   if (isLoggedIn) {
//     return <DashboardScreen />;
//   }

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <View style={styles.formContainer}>
//         <TextInput
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           style={styles.input}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//         <TextInput
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           style={styles.input}
//           autoCapitalize="none"
//         />
//         <TouchableOpacity onPress={handleEmailLogin} style={styles.button}>
//           <Text style={styles.buttonText}>Sign In</Text>
//         </TouchableOpacity>

//          <TouchableOpacity onPress={connectWithGoogle} style={styles.googleButton}>
//           <Text style={styles.buttonText}>Connect with Google</Text>
//         </TouchableOpacity>
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
//             onPress={() => navigation.navigate('Register')}
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
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   formContainer: {
//     width: '80%',
//   },
//   input: {
//     height: 50,
//     borderColor: '#5E8D93',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//     fontSize: 16,
//   },
//   googleButton: {
//     backgroundColor: '#DB4437', // Google's color
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 15,
//   },
//   button: {
//     backgroundColor: '#5E8D93',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 15,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   forgotPassword: {
//     color: '#5E8D93',
//     textAlign: 'center',
//     marginBottom: 20,
//     fontWeight: '700',
//   },
//   signupPrompt: {
//     flexDirection: 'row',
//     justifyContent: 'center',
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

// export default HomeScreen;

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

// import React, { useState, useEffect } from 'react';
// import { View, Image, StyleSheet, Alert } from 'react-native';
// import { TextInput, Text} from 'react-native-paper';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
// import Icon from 'react-native-vector-icons/FontAwesome';
// //import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import DashboardScreen from './DashboardScreen';
// import fbDataScreen from './FacebookData';
// import { Button } from 'react-native-elements';
// //import Icon from 'react-native-vector-icons/MaterialIcons';

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
//       await auth().signInWithEmailAndPassword(email, password);
//       setIsLoggedIn(true);
//     } catch (error) {
//       Alert.alert('Login Error', error.message);
//     }
//   };

//   const connectWithGoogle = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const { idToken } = await GoogleSignin.signIn();
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//       await auth().signInWithCredential(googleCredential);
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (isLoggedIn) {
//     // Navigate to DashboardScreen or show DashboardScreen component here
//     return <DashboardScreen/>
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.logoContainer}>
//         <Image source={require('./assets/logo.png')} style={styles.logo} />
//       </View>
//       <View style={styles.formContainer}>
//         <TextInput
//           label="Email"
//           value={email}
//           onChangeText={text => setEmail(text)}
//           style={styles.input}
//         />
//         <TextInput
//           label="Password"
//           value={password}
//           onChangeText={text => setPassword(text)}
//           secureTextEntry
//           style={styles.input}
//         />
//         <Button mode="contained" style={styles.button} onPress={handleEmailLogin}>
//           <Text style={styles.buttonLabel}>Login</Text>
//         </Button>
//         <Text style={styles.forgotPassword}>Forgot password?</Text>
//         <View style={styles.signupPrompt}>
//           <Text style={styles.signupText}>Don't have an account? </Text>
//           <Text style={styles.signupLink} onPress={() => navigation.navigate('Register')}>
//             Register
//           </Text>
//         </View>

//         <Button
//           mode="contained"
//           icon={() => <Icon name="google" size={24} color="white" />} // Display the Google icon
//           style={styles.googleButton}
//           onPress={connectWithGoogle}
//         >
//           Connect with Google
//         </Button>
//       </View>
//     </View>
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
//     width: '170%', // Adjust width as needed
//     height: '170%', // Adjust height as needed
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
//   },
//   googleButton: {
//     backgroundColor: '#5E8D93',
//     marginTop: 12,
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

// export default HomeScreen;

import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Alert} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardScreen from './DashboardScreen';
import fbDataScreen from './FacebookData';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const HomeScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '75712864116-96qe3fdkqs6d0m9s93qbnvu4fjsbuka0.apps.googleusercontent.com',
    });
  }, []);

  const handleEmailLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  const connectWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoggedIn) {
    // Navigate to DashboardScreen or show DashboardScreen component here
    return <DashboardScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <FontAwesome5
            name="envelope"
            size={20}
            color="#3868D9"
            style={styles.icon}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome5
            name="key"
            size={20}
            color="#3868D9"
            style={styles.icon}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            style={styles.input}
          />
        </View>

        <Button
          mode="contained"
          style={styles.button}
          onPress={handleEmailLogin}>
          <Text style={styles.buttonLabel}>Login</Text>
        </Button>
        <Text
          style={styles.forgotPassword}
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot password?
        </Text>
        <View style={styles.signupPrompt}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate('Register')}>
            Register
          </Text>
        </View>
        <Button
          mode="contained"
          icon={() => <Icon name="google" size={24} color="white" />} // Display the Google icon
          style={styles.googleButton}
          onPress={connectWithGoogle}>
          Connect with Google
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 60,
  },
  logo: {
    width: '90%', // Adjust width as needed
    height: '90%', // Adjust height as needed
    resizeMode: 'contain',
    marginBottom: '10%',
  },
  formContainer: {
    flex: 3,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 58,
    marginBottom: 16,
    fontSize: 16,
    color: '#3868D9',
    paddingLeft: 20,
    marginTop: 13,
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
    color: 'white',
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 12,
    textAlign: 'center',
    color: '#3868D9',
    fontWeight: '700',
  },
  signupPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: 'black',
    fontSize: 16,
  },
  signupLink: {
    color: '#3868D9',
    fontWeight: '700',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  googleButton: {
    backgroundColor: '#3868D9',
    marginTop: 12,
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
    width: '150%',
    height: '150%',
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
    color: '#dc5933',
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
  },
};

export default HomeScreen;
