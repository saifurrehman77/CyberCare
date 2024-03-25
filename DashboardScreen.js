// import React, { useEffect } from 'react';
// import { StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
// import { getAuth, signOut, } from  '@react-native-firebase/auth';
// import { useNavigation } from '@react-navigation/native';
// import { Avatar, Card, Title, Paragraph, Button, List, Appbar} from 'react-native-paper';


// const DashboardScreen = () => {
//   const auth = getAuth();
//   const navigation = useNavigation();

// import React, { useEffect, useState } from 'react';
// import { StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, View, Text } from 'react-native';
// //import { getAuth, signOut } from '@react-native-firebase/auth';
// import { useNavigation } from '@react-navigation/native';
// import { Avatar, Card, Button, List, Appbar } from 'react-native-paper';
// import auth from '@react-native-firebase/auth';

// // const DashboardScreen = () => {
//   const navigation = useNavigation();
//   const [userProfile, setUserProfile] = useState({ name: '', email: '' });
//   const auth = getAuth();
//   const navigation = useNavigation();
//   const [userProfile, setUserProfile] = useState(null);

//   useEffect(() => {
//     const unsubscribeAuth = auth.onAuthStateChanged((user) => {
//       if (user) {
//         // Extract the user profile data here
//         setUserProfile({
//           name: user.displayName || 'No Name', // Fallback if displayName is not set
//           email: user.email || 'No Email', // Fallback if email is not set
//         });
//       } else {
//         // If not signed in, set user profile to null
//         setUserProfile(null);
//       }
//     });

//     // Unsubscribe from the auth listener when the component unmounts
//     return () => unsubscribeAuth();
//   }, [auth]);






//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Home' }],
//       });
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };
//         useEffect(() => {
//           const unsubscribe = auth().onAuthStateChanged((user) => { // Use auth() directly
//             if (user) {
//               setUserProfile({
//                 name: user.displayName || 'No Name',
//                 email: user.email || 'No Email',
//               });
//             } else {
//               setUserProfile({ name: '', email: '' });
//             }
//           });

//           return unsubscribe; // Return the unsubscribe function to clean up
//         }, []);

//         const handleLogout = async () => {
//           try {
//             await auth().signOut(); // Use auth().signOut()
//             navigation.reset({
//               index: 0,
//               routes: [{ name: 'Home' }],
//             });
//           } catch (error) {
//             console.error('Error signing out:', error);
//           }
//         };
// // Assuming you have a navigation prop

//   const handleSocialMediaConnect = (platform) => {
//     if (platform === 'Facebook') {
//       LoginManager.logInWithPermissions(['public_profile']).then(
//         function (result) {
//           if (result.isCancelled) {
//             console.log("Login cancelled");
//           } else {
//             AccessToken.getCurrentAccessToken().then(
//               (data) => {
//                 // Assuming you have a separate screen to handle Facebook data
//                 navigation.navigate('FacebookConnect', { accessToken: data.accessToken });
//               }
//             );
//           }
//         },
//         function (error) {
//           console.log("Login fail with error: " + error);
//         }
//       );
//     } else if (platform === 'Twitter') {
//       // Navigate to TwitterConnectScreen
//       navigation.navigate('TwitterConnect');
//     } 
//   };

// const handleProfilePress = () => {
//   console.log("Profile Button Pressed");
//   navigation.navigate('ProfileSettings');
// };

//     return (
//       <SafeAreaView style={styles.container}>
//         <Appbar.Header style={styles.appbar}>
//           <Appbar.Content title="Dashboard" style={styles.appbarTitle} />
//           <TouchableOpacity onPress={handleProfilePress}>
//             <Avatar.Icon 
//               size={40} 
//               icon="account-circle" 
//               style={styles.profileIcon} 
//             />
//           </TouchableOpacity>
//         </Appbar.Header>

{/* <ScrollView style={styles.content}>
            <Card style={styles.card}>
              <Card.Title 
                title="User Profile" 
                left={(props) => (
                  <Avatar.Icon 
                    {...props} 
                    icon="account" 
                    style={{ backgroundColor: '#eef9f0' }}
                    color="#5E8D93"
                  />
                )} 
              />
              <Card.Content>
                <Title>Saif ur Rehman</Title>
                <Paragraph>Software Engineer</Paragraph>
              </Card.Content>
            </Card> */}
{/* <ScrollView style={styles.content}>
            {userProfile && (
              <Card style={styles.card}>
                <Card.Title title="User Profile" left={(props) => <Avatar.Icon {...props} icon="account" />} />
                <Card.Content>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{userProfile.name}</Text>
                    <Text style={styles.userEmail}>{userProfile.email}</Text>
                  </View>
                </Card.Content>
              </Card>
            )}

            <Card style={styles.card}>
              <Card.Title title="Connect to Social Media" />
              <Card.Content>
                <TouchableOpacity onPress={() => handleSocialMediaConnect('Facebook')}>
                  <List.Item
                    title="Connect to Facebook"
                    left={() => <List.Icon color="#4267B2" icon="facebook" />}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSocialMediaConnect('Twitter')}>
                  <List.Item
                    title="Connect to Twitter"
                    left={() => <List.Icon color="#1DA1F2" icon="twitter" />}
                  />
                </TouchableOpacity>

              </Card.Content>
            </Card>

            <Button icon="logout" mode="contained" onPress={handleLogout} style={styles.button} color="#eef9f0">
              Logout
            </Button>
          </ScrollView>
        </SafeAreaView>
      );
            }

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
  profileIcon: {
    backgroundColor: '#eef9f0', 
    color: '#5E8D93', 
    marginRight: 10,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    marginVertical: 10,
    elevation: 4,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#5E8D93',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 10,
    elevation: 4,
  },
  // ... other styles ...
});

export default DashboardScreen; */}


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Text } from 'react-native';
// import { Avatar, Card, Title, Paragraph, Button, List, Appbar } from 'react-native-paper';
// import auth from '@react-native-firebase/auth';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
// import { useNavigation } from '@react-navigation/native';

// const DashboardScreen = () => {
//   const [userData, setUserData] = useState(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   const onAuthStateChanged = (user) => {
//     setUserData(user);
//   };

//   const handleFacebookLogin = async () => {
//     try {
//       const result = await LoginManager.logInWithPermissions(['public_profile', 'email', 'user_posts']);
//       if (result.isCancelled) {
//         throw 'User cancelled the login process';
//       }
//       const data = await AccessToken.getCurrentAccessToken();
//       if (!data) {
//         throw 'Something went wrong obtaining access token';
//       }
//       const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
//       await auth().signInWithCredential(facebookCredential);
//     } catch (error) {
//       console.error('Facebook Login Error: ', error);
//     }
//   };


//   const handleFacebookLogout = async () => {
//     try {
//       await auth().signOut();
//       LoginManager.logOut();
//       setUserData(null);
//     } catch (error) {
//       console.error('Facebook Logout Error: ', error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await auth().signOut();
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Home' }],
//       });
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Appbar.Header style={styles.appbar}>
//         <Appbar.Content title="Dashboard" style={styles.appbarTitle} />
//         <TouchableOpacity onPress={handleFacebookLogout}>
//           <Avatar.Icon
//             size={40}
//             icon="account-circle"
//             style={styles.profileIcon}
//           />
//         </TouchableOpacity>
//       </Appbar.Header>

//       <ScrollView style={styles.content}>
//         <Card style={styles.card}>
//           <Card.Title
//             title="User Profile"
//             left={(props) => (
//               <Avatar.Icon
//                 {...props}
//                 icon="account"
//                 style={{ backgroundColor: '#eef9f0' }}
//                 color="#5E8D93"
//               />
//             )}
//           />
//           <Card.Content>
//             <Title>{userData?.displayName || 'Guest'}</Title>
//             <Paragraph>{userData?.email || 'No Email'}</Paragraph>
//           </Card.Content>
//         </Card>

//         <Card style={styles.card}>
//           <Card.Title title="Connect to Social Media" />
//           <Card.Content>
//             <TouchableOpacity onPress={handleFacebookLogin}>
//               <List.Item
//                 title="Connect to Facebook"
//                 left={() => <List.Icon color="#4267B2" icon="facebook" />}
//               />
//             </TouchableOpacity>
//             {/* Other social media connections can be added here */}
//           </Card.Content>
//         </Card>

//         <Button icon="logout" mode="contained" onPress={handleLogout} style={styles.button} color="#eef9f0">
//           Logout
//         </Button>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#eef9f0',
//   },
//   appbar: {
//     backgroundColor: '#eef9f0',
//     elevation: 0,
//   },
//   appbarTitle: {
//     color: '#5E8D93',
//     fontWeight: 'bold',
//   },
//   profileIcon: {
//     backgroundColor: '#eef9f0',
//     color: '#5E8D93',
//     marginRight: 10,
//   },
//   content: {
//     padding: 20,
//   },
//   card: {
//     backgroundColor: 'white',
//     marginVertical: 10,
//     elevation: 4,
//     borderRadius: 8,
//   },
//   button: {
//     backgroundColor: '#5E8D93',
//     borderRadius: 25,
//     marginVertical: 10,
//     paddingVertical: 10,
//     elevation: 4,
//   },
//   // ... other styles ...
// });

// export default DashboardScreen;

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
// import { Avatar, Card, Title, Paragraph, Button, List, Appbar } from 'react-native-paper';
// import auth from '@react-native-firebase/auth';
// import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';
// import { useNavigation } from '@react-navigation/native';

// const DashboardScreen = () => {
//   const [userData, setUserData] = useState(null);
//   const [userPosts, setUserPosts] = useState([]);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   const onAuthStateChanged = (user) => {
//     setUserData(user);
//   };

//   const handleFacebookLogin = async () => {
//     try {
//       const result = await LoginManager.logInWithPermissions(['public_profile', 'email', 'user_posts']);
//       if (result.isCancelled) {
//         throw new Error('User cancelled the login process');
//       }
//       const data = await AccessToken.getCurrentAccessToken();
//       if (!data) {
//         throw new Error('Something went wrong obtaining access token');
//       }
//       const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
//       await auth().signInWithCredential(facebookCredential);

//       // Fetch user posts after successful login
//       fetchUserPosts(data.accessToken.toString());
//     } catch (error) {
//       console.error('Facebook Login Error: ', error);
//     }
//   };

//   const fetchUserPosts = (accessToken) => {
//     const request = new GraphRequest(
//       '/me/posts',
//       {
//         accessToken,
//         parameters: {
//           fields: {
//             string: 'message,created_time' // Adjust based on the data you need
//           }
//         }
//       },
//       (error, result) => {
//         if (error) {
//           console.error('Error fetching posts: ', error);
//         } else {
//           setUserPosts(result.data);
//         }
//       }
//     );
//     new GraphRequestManager().addRequest(request).start();
//   };

//   const handleFacebookLogout = async () => {
//     try {
//       await auth().signOut();
//       LoginManager.logOut();
//       setUserData(null);
//       setUserPosts([]); // Clear posts on logout
//     } catch (error) {
//       console.error('Facebook Logout Error: ', error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await auth().signOut();
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Home' }],
//       });
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Appbar.Header style={styles.appbar}>
//         <Appbar.Content title="Dashboard" style={styles.appbarTitle} />
//         <TouchableOpacity onPress={handleFacebookLogout}>
//           <Avatar.Icon
//             size={40}
//             icon="account-circle"
//             style={styles.profileIcon}
//           />
//         </TouchableOpacity>
//       </Appbar.Header>

//       <ScrollView style={styles.content}>
//         <Card style={styles.card}>
//           <Card.Title
//             title="User Profile"
//             left={(props) => (
//               <Avatar.Icon
//                 {...props}
//                 icon="account"
//                 style={{ backgroundColor: '#eef9f0' }}
//                 color="#5E8D93"
//               />
//             )}
//           />
//           <Card.Content>
//             <Title>{userData?.displayName || 'Guest'}</Title>
//             <Paragraph>{userData?.email || 'No Email'}</Paragraph>
//           </Card.Content>
//         </Card>

//         {/* Display user posts */}
//         {userPosts.length > 0 && (
//           <Card style={styles.card}>
//             <Card.Title title="Your Facebook Posts" />
//             <Card.Content>
//               {userPosts.map((post, index) => (
//                 <View key={index} style={styles.postContainer}>
//                   <Text>Date: {post.created_time}</Text>
//                   <Text>Message: {post.message || 'No message'}</Text>
//                 </View>
//               ))}
//             </Card.Content>
//           </Card>
//         )}

//         <Card style={styles.card}>
//           <Card.Title title="Connect to Social Media" />
//           <Card.Content>
//             <TouchableOpacity onPress={handleFacebookLogin}>
//               <List.Item
//                 title="Connect to Facebook"
//                 left={() => <List.Icon color="#4267B2" icon="facebook" />}
//               />
//             </TouchableOpacity>
//             {/* Other social media connections can be added here */}
//           </Card.Content>
//         </Card>

//         <Button icon="logout" mode="contained" onPress={handleLogout} style={styles.button} color="#eef9f0">
//           Logout
//         </Button>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   appbar: {
//     backgroundColor: 'white',
//   },
//   appbarTitle: {
//     color: 'black',
//   },
//   profileIcon: {
//     backgroundColor: 'transparent',
//   },
//   content: {
//     padding: 8,
//   },
//   card: {
//     margin: 4,
//   },
//   postContainer: {
//     marginBottom: 16,
//   },
//   button: {
//     margin: 4,
//   },
// });

// export default DashboardScreen;
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
// import { Avatar, Card, Title, Paragraph, Button, List, Appbar } from 'react-native-paper';
// import auth from '@react-native-firebase/auth';
// import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';
// import { useNavigation } from '@react-navigation/native';

// const DashboardScreen = () => {
//   const [userData, setUserData] = useState(null);
//   const [userPosts, setUserPosts] = useState([]);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   const onAuthStateChanged = (user) => {
//     setUserData(user);
//   };

//   const handleFacebookLogin = async () => {
//     try {
//       const result = await LoginManager.logInWithPermissions(['public_profile', 'email', 'user_posts']);
//       if (result.isCancelled) {
//         throw new Error('User cancelled the login process');
//       }
//       const data = await AccessToken.getCurrentAccessToken();
//       if (!data) {
//         throw new Error('Something went wrong obtaining access token');
//       }
//       const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
//       await auth().signInWithCredential(facebookCredential);

//       // Fetch user posts and comments after successful login
//       fetchUserPosts(data.accessToken.toString());
//     } catch (error) {
//       console.error('Facebook Login Error: ', error);
//     }
//   };

//   const fetchUserPosts = (accessToken) => {
//     const request = new GraphRequest(
//       '/me/posts',
//       {
//         accessToken,
//         parameters: {
//           fields: {
//             string: 'message,created_time,comments.limit(5){message,from,created_time}' // Fetches comments for each post
//           }
//         }
//       },
//       (error, result) => {
//         if (error) {
//           console.error('Error fetching posts: ', error);
//         } else {
//           setUserPosts(result.data);
//         }
//       }
//     );
//     new GraphRequestManager().addRequest(request).start();
//   };

//   const handleFacebookLogout = async () => {
//     try {
//       await auth().signOut();
//       LoginManager.logOut();
//       setUserData(null);
//       setUserPosts([]); // Clear posts on logout
//     } catch (error) {
//       console.error('Facebook Logout Error: ', error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await auth().signOut();
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Home' }],
//       });
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Appbar.Header style={styles.appbar}>
//         <Appbar.Content title="Dashboard" style={styles.appbarTitle} />
//         <TouchableOpacity onPress={handleFacebookLogout}>
//           <Avatar.Icon
//             size={40}
//             icon="account-circle"
//             style={styles.profileIcon}
//           />
//         </TouchableOpacity>
//       </Appbar.Header>

//       <ScrollView style={styles.content}>
//         <Card style={styles.card}>
//           <Card.Title
//             title="User Profile"
//             left={(props) => (
//               <Avatar.Icon
//                 {...props}
//                 icon="account"
//                 style={{ backgroundColor: '#eef9f0' }}
//                 color="#5E8D93"
//               />
//             )}
//           />
//           <Card.Content>
//             <Title>{userData?.displayName || 'Guest'}</Title>
//             <Paragraph>{userData?.email || 'No Email'}</Paragraph>
//           </Card.Content>
//         </Card>

//         {/* Display user posts and their comments */}
//         {userPosts.length > 0 && (
//           <Card style={styles.card}>
//             <Card.Title title="Your Facebook Posts" />
//             <Card.Content>
//               {userPosts.map((post, index) => (
//                 <View key={index} style={styles.postContainer}>
//                   <Text>Date: {post.created_time}</Text>
//                   <Text>Message: {post.message || 'No message'}</Text>
//                   {post.comments && post.comments.data && (
//                     <View style={styles.commentsContainer}>
//                       <Text style={styles.commentsTitle}>Comments:</Text>
//                       {post.comments.data.map((comment, commentIndex) => (
//                         <Text key={commentIndex} style={styles.commentText}>
//                           {comment.message} - {new Date(comment.created_time).toLocaleString()}
//                         </Text>
//                       ))}
//                     </View>
//                   )}
//                 </View>
//               ))}
//             </Card.Content>
//           </Card>
//         )}

//         <Card style={styles.card}>
//           <Card.Title title="Connect to Social Media" />
//           <Card.Content>
//             <TouchableOpacity onPress={handleFacebookLogin}>
//               <List.Item
//                 title="Connect to Facebook"
//                 left={() => <List.Icon color="#4267B2" icon="facebook" />}
//               />
//             </TouchableOpacity>
//             {/* Other social media connections can be added here */}
//           </Card.Content>
//         </Card>

//         <Button icon="logout" mode="contained" onPress={handleLogout} style={styles.button} color="#eef9f0">
//           Logout
//         </Button>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   appbar: {
//     backgroundColor: 'white',
//   },
//   appbarTitle: {
//     color: 'black',
//   },
//   profileIcon: {
//     backgroundColor: 'transparent',
//   },
//   content: {
//     padding: 8,
//   },
//   card: {
//     margin: 4,
//   },
//   postContainer: {
//     marginBottom: 16,
//   },
//   commentsContainer: {
//     marginTop: 8,
//   },
//   commentsTitle: {
//     fontWeight: 'bold',
//   },
//   commentText: {
//     fontSize: 12,
//     marginLeft: 8,
//   },
//   button: {
//     margin: 4,
//   },
// });

// export default DashboardScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
// import { Card, Title, Paragraph, Button, List, Avatar, Appbar } from 'react-native-paper';
// import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk-next';
// import auth from '@react-native-firebase/auth';
// import { red100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

// const DashboardScreen = () => {
//   const [userData, setUserData] = useState(null);
//   const [userPosts, setUserPosts] = useState([]);
//   const [modelResults, setModelResults] = useState(null);

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   const onAuthStateChanged = (user) => {
//     setUserData(user);
//     if (user) {
//       // Perform Facebook Login to fetch data
//       handleFacebookLogin();
//     }
//   };

//   const handleFacebookLogin = async () => {
//     try {
//       const result = await LoginManager.logInWithPermissions(['public_profile', 'email', 'user_posts']);
//       if (result.isCancelled) {
//         throw new Error('User cancelled the login process');
//       }
//       const data = await AccessToken.getCurrentAccessToken();
//       if (!data) {
//         throw new Error('Something went wrong obtaining access token');
//       }
//       // Fetch user data from Facebook
//       fetchUserData(data.accessToken.toString());
//       // Fetch user posts from Facebook
//       fetchUserPosts(data.accessToken.toString());
//     } catch (error) {
//       console.error('Facebook Login Error: ', error);
//     }
//   };

//   const fetchUserData = (accessToken) => {
//     const request = new GraphRequest(
//       '/me',
//       {
//         accessToken: accessToken,
//         parameters: {
//           fields: {
//             string: 'id,name,email,picture.type(large)' // Fetches user ID, name, email, and large profile picture
//           }
//         }
//       },
//       (error, result) => {
//         if (error) {
//           console.error('Error fetching user data:', error);
//         } else {
//           setUserData(result);
//         }
//       }
//     );
//     new GraphRequestManager().addRequest(request).start();
//   };

//   const fetchUserPosts = (accessToken) => {
//     const request = new GraphRequest(
//       '/me/posts',
//       {
//         accessToken,
//         parameters: {
//           fields: {
//             string: 'message,created_time' // Adjust based on the data you need
//           }
//         }
//       },
//       (error, result) => {
//         if (error) {
//           console.error('Error fetching posts: ', error);
//         } else {
//           setUserPosts(result.data);
//           // Example: Sending first post's message to the model
//           const messages = result.data.map(post => post.message).filter(Boolean);
//           sendDataToModel(messages);
//         }
//       }
//     );
//     new GraphRequestManager().addRequest(request).start();
//   };

//   const sendDataToModel = async (messages) => {
//     const modelEndpoint = 'http://192.168.0.103:8000/predict'; // Replace with your actual endpoint
//     console.log(messages)
//     try {
//       const response = await fetch(modelEndpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({"comments": messages }),
//       });
//       const result = await response.json();
//       setModelResults(result); // Update the state with the model results
//     } catch (error) {
//       console.error('Error sending data to model:', error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await auth().signOut();
//       LoginManager.logOut();
//       setUserData(null);
//       setUserPosts([]);
//       setModelResults(null);
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//   {userData ? (
//     <>
//       <Text>Welcome, {userData.name}</Text>
//       <Image source={{ uri: userData.picture?.data?.url }} style={styles.image} />
//       <Text>Email: {userData.email}</Text>
//       {modelResults && (
//         <View style={styles.resultsContainer}>
//           <Text>Model Analysis:</Text>
//           <Text>The Speech Is: {modelResults[0].predicted_label}</Text>
//         </View>
//       )}
//     </>
//   ) : (
//     <Text>Loading...</Text>
//   )}
// </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   resultsContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//     color:'#5E8D93' 
//   },
// });




// // Styles remain the same as your last DashboardScreen component
// // Include your StyleSheet here

// export default DashboardScreen;

import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Card, Button, List, Appbar } from 'react-native-paper';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState({ name: '', email: '' });

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserProfile({
          name: user.displayName || 'No Name',
          email: user.email || 'No Email',
        });
      } else {
        setUserProfile({ name: '', email: '' });
      }
    });

    return unsubscribe; // Return the unsubscribe function to clean up
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut(); // Use auth().signOut()
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSocialMediaConnect = (platform) => {
    if (platform === 'Facebook') {
      LoginManager.logInWithPermissions(['public_profile']).then(
        function (result) {
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
            AccessToken.getCurrentAccessToken().then(
              (data) => {
                // Assuming you have a separate screen to handle Facebook data
                navigation.navigate('FacebookConnect', { accessToken: data.accessToken });
              }
            );
          }
        },
        function (error) {
          console.log("Login fail with error: " + error);
        }
      );
    } else if (platform === 'Twitter') {
      // Navigate to TwitterConnectScreen
      navigation.navigate('TwitterConnect');
    }
  };

  const handleProfilePress = () => {
    console.log("Profile Button Pressed");
    navigation.navigate('ProfileSettings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content style={styles.appbarTitle} />
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileSettingsContainer}>
      <Avatar.Icon
        size={40}
        icon="account-circle"
        style={styles.profileIcon}
      />
      <Text style={styles.settingsText}></Text>
    </TouchableOpacity>
      </Appbar.Header>

      <ScrollView style={styles.content}>
        {userProfile && (
          <Card style={styles.card}>
            <Card.Title
              title="User Profile"
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="account"
                  style={{ backgroundColor: '#3868D9' }}
                  color="#99b7ff"
                />
              )}
            />
            <Card.Content>
            <View style={styles.userInfo}>
          <View style={styles.userDetail}>
            <FontAwesome5 name="user" size={20} color="#3868D9" style={styles.icon} />
            <Text style={styles.userName}>{userProfile.name}</Text>
          </View>

          <View style={styles.userDetail}>
            <FontAwesome5 name="envelope" size={20} color="#3868D9" style={styles.icon} />
            <Text style={styles.userEmail}>{userProfile.email}</Text>
          </View>
        </View>
            </Card.Content>
          </Card>
        )}

        <Card style={styles.card}>
          <Card.Title title="Connect to Social Media" />
          <Card.Content>
            <TouchableOpacity onPress={() => handleSocialMediaConnect('Facebook')}>
              <List.Item
                title="Connect to Facebook"
                left={() => <List.Icon color="#4267B2" icon="facebook" />}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSocialMediaConnect('Twitter')}>
              <List.Item
                title="Connect to Twitter"
                left={() => <List.Icon color="#1DA1F2" icon="twitter" />}
              />
            </TouchableOpacity>
          </Card.Content>
        </Card>

        <Button icon="logout" mode="contained" onPress={handleLogout} style={styles.button} color="#eef9f0">
          Logout
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Adjust the space between each detail as necessary
  },
  icon: {
    marginRight: 10, // Adjust the space between the icon and the text as necessary
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  profileSettingsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    
  },
  settingsText: {
    fontWeight: 'bold',
    fontSize: 12,
    alignContent:'center',
  },
  profileIcon: {
    backgroundColor: '#3868D9',
    // Removed color style since it's not affecting the icon itself
  },
  userName: {
    fontWeight: "bold",
    padding: "5%",
    fontSize: 20,
  },
  
  userEmail: {
    fontSize: 15,
    marginLeft: 15
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  settingsText:{
    fontWeight: "bold",
    fontSize: 12,
    paddingRight: 5,
  },
  appbar: {
    backgroundColor: '#ffffff',
    marginRight: 300,
    elevation: 0,
  },
  appbarTitle: {
    color: '#3868D9',
    fontWeight: 'bold',
  },
  profileIcon: {
    backgroundColor: '#3868D9',
    color: '#3868D9',
    marginRight: 20,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#d4e0fc',
    marginVertical: 15,
    padding: 10,
    borderRadius: 18,
    shadowColor: "black",
  },
  button: {
    backgroundColor: '#3868D9',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 10,
    elevation: 4,
  },
});

export default DashboardScreen;
