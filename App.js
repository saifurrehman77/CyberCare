// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen'; // Adjust the import statement
import RegisterScreen from  './RegisterScreen';
import FbdataScreen from './FacebookData';
import DashboardScreen from './DashboardScreen';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="fbData" component={FbdataScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;



// import React, { useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

// const App = () => {
//   useEffect(() => {
//     // Configure Google Sign-In when the component mounts
//     GoogleSignin.configure({
//       webClientId: '75712864116-96qe3fdkqs6d0m9s93qbnvu4fjsbuka0.apps.googleusercontent.com',
//     });
//   }, []);

//   const connectWithGoogle = async () => {
//     try {
//       // Check if your device supports Google Play
//       await GoogleSignin.hasPlayServices();

//       // Get the user's ID token
//       const { idToken } = await GoogleSignin.signIn();

//       // Create a Google credential with the token
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//       // Sign-in the user with the credential
//       const userCredential = await auth().signInWithCredential(googleCredential);

//       console.log(userCredential.user);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const signOut = async () => {
//     try {
//       await GoogleSignin.revokeAccess();
//       await auth().signOut();
//       console.log("Sign Out Success");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Hello, React Native!</Text>
//       <TouchableOpacity
//         style={{
//           marginTop: 20,
//           padding: 10,
//           backgroundColor: 'blue',
//           borderRadius: 5,
//         }}
//         onPress={connectWithGoogle}
//       >
//         <Text style={{ color: 'white' }}>Connect with Google</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={{
//           marginTop: 20,
//           padding: 10,
//           backgroundColor: 'blue',
//           borderRadius: 5,
//         }}
//         onPress={signOut}
//       >
//         <Text style={{ color: 'white' }}>Sign Out</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default App;

// import React, { useState } from 'react';
// import { View, Button, Text, StyleSheet } from 'react-native';
// import { NativeModules } from 'react-native';

// const { RNTwitterSignIn } = NativeModules;

// const MyComponent = () => {
//   const [user, setUser] = useState(null);

//   const APIKEY = {
//    authToken: 'aZrEGlgftY0hOlhniDMOIhNBS',
//    authTokenSecret: 'yJdJHyzNhmXTyDeqR3bQHXTTkVnA3ML7VBN23wJwohgDrVYBxw'
//   };

//   // const login = () => {
//   //   RNTwitterSignIn.init(APIKEY.TWITTER_API_KEY, APIKEY.TWITTER_SECRET_KEY);
//   //   RNTwitterSignIn.logIn()
//   //     .then(loginData => {
//   //       console.log("loginData", loginData);
//   //       if (loginData && loginData.userName) {
//   //         setUser({ displayName: loginData.userName });
//   //       }
//   //     }).catch(error => {
//   //       console.error("error", error);
//   //     });
//   // };

//   async function onTwitterButtonPress() {
//     // Perform the login request
//     const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();
  
//     // Create a Twitter credential with the tokens
//     const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);
  
//     // Sign-in the user with the credential
//     return auth().signInWithCredential(twitterCredential);
//   }

//   return (
//     <View style={styles.container}>
//       <Button title="Twitter Sign-In" onPress={onTwitterButtonPress} />
//       {user && <Text>Welcome {user.displayName}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });

// export default MyComponent;

// import React, { useState } from 'react';
// import { View, Button, Text, StyleSheet } from 'react-native';
// import { NativeModules } from 'react-native';
// import auth from '@react-native-firebase/auth';

// const { RNTwitterSignIn } = NativeModules;

// const MyComponent = () => {
//   const [user, setUser] = useState(null);

//   // Replace with your actual Twitter API key and secret
//   const TWITTER_API_KEY = 'aZrEGlgftY0hOlhniDMOIhNBS';
//   const TWITTER_SECRET_KEY = 'yJdJHyzNhmXTyDeqR3bQHXTTkVnA3ML7VBN23wJwohgDrVYBxw';

//   // Initialize the Twitter SDK
//   RNTwitterSignIn.init(TWITTER_API_KEY, TWITTER_SECRET_KEY);

//   async function onTwitterButtonPress() {
//     try {
//       const loginData = await RNTwitterSignIn.logIn();
      
//       if (loginData) {
//         const { authToken, authTokenSecret } = loginData;
//         const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);
//         const userCredential = await auth().signInWithCredential(twitterCredential);
        
//         setUser(userCredential.user);
//       }
//     } catch (error) {
//       console.error('Twitter login error:', error);
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Button title="Twitter Sign-In" onPress={onTwitterButtonPress} />
//       {user && <Text>Welcome {user.displayName}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });

// export default MyComponent;

// export default MyComponent
// import auth from '@react-native-firebase/auth';
// import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

// const App = () => {
//   const [userData, setUserData] = useState({});

//   const facebookLogin = async () => {
//     // Attempt login with permissions
//     const result = await LoginManager.logInWithPermissions([
//       'public_profile',
//       'email',
//     ]);

//     if (result.isCancelled) {
//       throw 'User cancelled the login process';
//     }

//     // Once signed in, get the users AccesToken
//     const data = await AccessToken.getCurrentAccessToken();

//     if (!data) {
//       throw 'Something went wrong obtaining access token';
//     }

//     // Create a Firebase credential with the AccessToken
//     const facebookCredential = auth.FacebookAuthProvider.credential(
//       data.accessToken,
//     );

//     // Sign-in the user with the credential
//     return auth().signInWithCredential(facebookCredential);
//   };

//   const facebookLogout = async () => {
//     try {
//       await auth().signOut();
//       LoginManager.logOut();
//       setUserData({});
//       console.log('User Logout Success');
//     } catch (error) {
//       console.log('Error: ', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Facebook Login</Text>
//       <View>
//         <Text>
//           UID: <Text style={styles.title}>{userData?.uid}</Text>
//         </Text>
//         <Text>
//           Email: <Text style={styles.title}>{userData?.email}</Text>
//         </Text>
//         <Text>
//           User Name: <Text style={styles.title}>{userData?.displayName}</Text>
//         </Text>
//       </View>
//       <Pressable
//         onPress={() =>
//           facebookLogin()
//             .then(res => {
//               console.log(res);
//               setUserData(res.user);
//             })
//             .catch(error => console.log(error))
//         }
//         style={styles.fbBtn}>
//         <Text style={styles.btnTitle}>Facebook Login</Text>
//       </Pressable>
//       <Pressable onPress={facebookLogout} style={styles.fbBtn}>
//         <Text style={styles.btnTitle}>Facebook Logout</Text>
//       </Pressable>
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   fbBtn: {
//     backgroundColor: '#1399F130',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   btnTitle: {
//     fontSize: 22,
//     color: '#1399F1',
//   },
// });

// import React, { useState } from 'react';
// import { View, Button, Text, StyleSheet } from 'react-native';
// import { NativeModules } from 'react-native';

// const { RNTwitterSignIn } = NativeModules;

// const MyComponent = () => {
//   const [user, setUser] = useState(null);

//   const APIKEY = {
//     twitter_consumer_key: 'TVotQ1hxeEJOYVJYaTB1SEdhZHI6MTpjaQ',
//     twitter_consumer_secret: 'T4NM-S0dMN_4v2jI-r4za307XBPt93f3bMbAJguvoXLH8Ghnh5'
//   };

//   const login = () => {
//     RNTwitterSignIn.init(APIKEY.twitter_consumer_key, APIKEY.twitter_consumer_secret);
//     RNTwitterSignIn.logIn()
//       .then(loginData => {
//         console.log("loginData", loginData);
//         if (loginData && loginData.userName) {
//           setUser({ displayName: loginData.userName });
//         }
//       }).catch(error => {
//         console.error("error", error);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Twitter Sign-In" onPress={login} />
//       {user && <Text>Welcome {user.displayName}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });

// export default MyComponent;

