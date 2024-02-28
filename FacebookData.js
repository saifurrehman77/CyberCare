// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet, Button } from 'react-native';
// import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';

// const fbdatascreen = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await AccessToken.getCurrentAccessToken();
//       if (data) {
//         // Fetch user data from Facebook
//         const userInfo = await fetchUserData(data.accessToken);
//         setUserData(userInfo);
//       }
//     };

//     fetchData();
//   }, []);

//   const fetchUserPosts = (accessToken) => {
//     return new Promise((resolve, reject) => {
//       const request = new GraphRequest(
//         '/me/posts',
//         {
//           accessToken: accessToken,
//           parameters: {
//             fields: {
//               string: 'id,message,created_time' // Adjust based on the data you need
//             }
//           }
//         },
//         (error, result) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(result.data); // The posts are in the 'data' field
//           }
//         }
//       );
  
//       new GraphRequestManager().addRequest(request).start();
//     });
//   };
  

//   // Render user data or a login button
//   return (
//     <View style={styles.container}>
//       {userData ? (
//         <>
//           <Text>Welcome, {userData.name}</Text>
//           <Image source={{ uri: userData.picture.data.url }} style={styles.image} />
//           <Text>Email: {userData.email}</Text>
//         </>
//       ) : (
//         <Text>Loading...</Text>
//       )}
//     </View>
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
// });

// export default fbdatascreen;
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';



const fetchUserData = (accessToken) => {
  return new Promise((resolve, reject) => {
    const request = new GraphRequest(
      '/me',
      {
        accessToken: accessToken,
        parameters: {
          fields: {
            string: 'id,name,email,picture.type(large)' // Fetches user ID, name, email, and large profile picture
          }
        }
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    new GraphRequestManager().addRequest(request).start();
  });
};

const FbDataScreen = () => {
  const [userData, setUserData] = useState(null);
  const [modelResults, setModelResults] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AccessToken.getCurrentAccessToken();
      if (data) {
        // Fetch user data from Facebook
        try {
          const userInfo = await fetchUserData(data.accessToken);
          setUserData(userInfo);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }

        // Fetch user posts from Facebook
        try {
          const userPosts = await fetchUserPosts(data.accessToken);
          // Extract "message" from posts and send to model
          const messages = userPosts.map(post => post.message).filter(Boolean); // Filter out any undefined or null messages
          sendDataToModel(messages);
        } catch (error) {
          console.error('Error fetching user posts:', error);
        }
      }
    };

    fetchData();
  }, []);

  const fetchUserPosts = (accessToken) => {
    return new Promise((resolve, reject) => {
      const request = new GraphRequest(
        '/me/posts',
        {
          accessToken: accessToken,
          parameters: {
            fields: {
              string: 'id,message,created_time' // Adjust based on the data you need
            }
          }
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.data); // The posts are in the 'data' field
          }
        }
      );
  
      new GraphRequestManager().addRequest(request).start();
    });
  };

  const sendDataToModel = async (messages) => {
  const modelEndpoint = 'http://127.0.0.1:8000/predict'; // Replace with your actual endpoint
  try {
    const response = await fetch(modelEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });
    const result = await response.json();
    setModelResults(result); // Update the state with the model results
  } catch (error) {
    console.error('Error sending data to model:', error);
  }
};


  return (
    <View style={styles.container}>
  {userData ? (
    <>
      <Text>Welcome, {userData.name}</Text>
      <Image source={{ uri: userData.picture?.data?.url }} style={styles.image} />
      <Text>Email: {userData.email}</Text>
      {modelResults && (
        <View style={styles.resultsContainer}>
          <Text>Model Analysis:</Text>
          <Text>Positive: {modelResults.hatespeech}</Text>
          <Text>Neutral: {modelResults.offensive}</Text>
          <Text>Negative: {modelResults.neither}</Text>
        </View>
      )}
    </>
  ) : (
    <Text>Loading...</Text>
  )}
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  resultsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});


export default FbDataScreen;
