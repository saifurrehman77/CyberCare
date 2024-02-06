// import React, { useEffect } from 'react';
// import { StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
// import { getAuth, signOut, } from  '@react-native-firebase/auth';
// import { useNavigation } from '@react-navigation/native';
// import { Avatar, Card, Title, Paragraph, Button, List, Appbar} from 'react-native-paper';


// const DashboardScreen = () => {
//   const auth = getAuth();
//   const navigation = useNavigation();
  




  

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

//   const handleSocialMediaConnect = (platform) => {
//     if (platform === 'Facebook') {
//       promptAsync();
//     } else {
//       // Placeholder for other social media platforms
//       console.log(`Connect to ${platform}`);
//     }
//   };

//   const handleProfilePress = () => {
//     console.log("Profile Button Pressed");
//     navigation.navigate('ProfileSettings');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Appbar.Header style={styles.appbar}>
//         <Appbar.Content title="Dashboard" style={styles.appbarTitle} />
//         <TouchableOpacity onPress={handleProfilePress}>
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
//             <Title>Saif ur Rehman</Title>
//             <Paragraph>Software Engineer</Paragraph>
//           </Card.Content>
//         </Card>

//         <Card style={styles.card}>
//           <Card.Title title="Connect to Social Media" />
//           <Card.Content>
//             <TouchableOpacity onPress={() => handleSocialMediaConnect('Facebook')}>
//               <List.Item
//                 title="Connect to Facebook"
//                 left={() => <List.Icon color="#4267B2" icon="facebook" />}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => handleSocialMediaConnect('Twitter')}>
//               <List.Item
//                 title="Connect to Twitter"
//                 left={() => <List.Icon color="#1DA1F2" icon="twitter" />}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => handleSocialMediaConnect('Reddit')}>
//               <List.Item
//                 title="Connect to Reddit"
//                 left={() => <List.Icon color="#FF5700" icon="reddit" />}
//               />
//             </TouchableOpacity>
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
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button, List, Appbar } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onAuthStateChanged = (user) => {
    setUserData(user);
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email', 'user_posts']);
      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      await auth().signInWithCredential(facebookCredential);

      // Fetch user posts and comments after successful login
      fetchUserPosts(data.accessToken.toString());
    } catch (error) {
      console.error('Facebook Login Error: ', error);
    }
  };

  const fetchUserPosts = (accessToken) => {
    const request = new GraphRequest(
      '/me/posts',
      {
        accessToken,
        parameters: {
          fields: {
            string: 'message,created_time,comments.limit(5){message,from,created_time}' // Fetches comments for each post
          }
        }
      },
      (error, result) => {
        if (error) {
          console.error('Error fetching posts: ', error);
        } else {
          setUserPosts(result.data);
        }
      }
    );
    new GraphRequestManager().addRequest(request).start();
  };

  const handleFacebookLogout = async () => {
    try {
      await auth().signOut();
      LoginManager.logOut();
      setUserData(null);
      setUserPosts([]); // Clear posts on logout
    } catch (error) {
      console.error('Facebook Logout Error: ', error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Dashboard" style={styles.appbarTitle} />
        <TouchableOpacity onPress={handleFacebookLogout}>
          <Avatar.Icon
            size={40}
            icon="account-circle"
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </Appbar.Header>

      <ScrollView style={styles.content}>
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
            <Title>{userData?.displayName || 'Guest'}</Title>
            <Paragraph>{userData?.email || 'No Email'}</Paragraph>
          </Card.Content>
        </Card>

        {/* Display user posts and their comments */}
        {userPosts.length > 0 && (
          <Card style={styles.card}>
            <Card.Title title="Your Facebook Posts" />
            <Card.Content>
              {userPosts.map((post, index) => (
                <View key={index} style={styles.postContainer}>
                  <Text>Date: {post.created_time}</Text>
                  <Text>Message: {post.message || 'No message'}</Text>
                  {post.comments && post.comments.data && (
                    <View style={styles.commentsContainer}>
                      <Text style={styles.commentsTitle}>Comments:</Text>
                      {post.comments.data.map((comment, commentIndex) => (
                        <Text key={commentIndex} style={styles.commentText}>
                          {comment.message} - {new Date(comment.created_time).toLocaleString()}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </Card.Content>
          </Card>
        )}

        <Card style={styles.card}>
          <Card.Title title="Connect to Social Media" />
          <Card.Content>
            <TouchableOpacity onPress={handleFacebookLogin}>
              <List.Item
                title="Connect to Facebook"
                left={() => <List.Icon color="#4267B2" icon="facebook" />}
              />
            </TouchableOpacity>
            {/* Other social media connections can be added here */}
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
  container: {
    flex: 1,
  },
  appbar: {
    backgroundColor: 'white',
  },
  appbarTitle: {
    color: 'black',
  },
  profileIcon: {
    backgroundColor: 'transparent',
  },
  content: {
    padding: 8,
  },
  card: {
    margin: 4,
  },
  postContainer: {
    marginBottom: 16,
  },
  commentsContainer: {
    marginTop: 8,
  },
  commentsTitle: {
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 12,
    marginLeft: 8,
  },
  button: {
    margin: 4,
  },
});

export default DashboardScreen;
