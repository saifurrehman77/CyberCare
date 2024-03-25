
// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';



// const fetchUserData = (accessToken) => {
//   return new Promise((resolve, reject) => {
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
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       }
//     );

//     new GraphRequestManager().addRequest(request).start();
//   });
// };

// const FacebookConnectScreen = () => {
//   const [userData, setUserData] = useState(null);
//   const [modelResults, setModelResults] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await AccessToken.getCurrentAccessToken();
//       if (data) {
//         // Fetch user data from Facebook
//         try {
//           const userInfo = await fetchUserData(data.accessToken);
//           setUserData(userInfo);
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }

//         // Fetch user posts from Facebook
//         try {
//           const userPosts = await fetchUserPosts(data.accessToken);
//           console.log(userPosts)
//           // Extract "message" from posts and send to model
//           const messages = userPosts.map(post => post.message).filter(Boolean);
//           console.log(messages) // Filter out any undefined or null messages
//           sendDataToModel(messages);
//         } catch (error) {
//           console.error('Error fetching user posts:', error);
//         }
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


//   const sendDataToModel = async (messages) => {
//     // Define all model endpoints
//     const modelEndpoints = {
//       hateSpeech: 'http://192.168.0.103:8000/predict/hatespeech',
//       racism: 'http://192.168.0.103:8000/predict/racism',
//       sexism: 'http://192.168.0.103:8000/predict/sexism',
//     };
  
//     // Use Promise.all to send requests to all endpoints concurrently
//     const modelPromises = Object.entries(modelEndpoints).map(([modelType, endpoint]) =>
//       fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ messages }), // Assuming each endpoint expects the same payload format
//       })
//       .then(response => response.json())
//       .then(result => ({
//         modelType,
//         result,
//       }))
//       .catch(error => {
//         console.error(`Error sending data to ${modelType} model:`, error);
//         // Optionally return an error indication for this model
//         return { modelType, error: true, message: `Error processing ${modelType}` };
//       })
//     );
  
//     try {
//       // Wait for all promises to resolve
//       const results = await Promise.all(modelPromises);
  
//       // Log the results to the console
//       console.log("Model results:", results);
  
//       // Update the state with the aggregated results
//       setModelResults(results);
//     } catch (error) {
//       console.error('Error sending data to models:', error);
//     }
//   };
  
//   return (
//     <View style={styles.container}>
//       {userData ? (
//         <>
//           <Text>Welcome, {userData.name}</Text>
//           {userData.picture?.data?.url && (
//             <Image source={{ uri: userData.picture.data.url }} style={styles.image} />
//           )}
//           <Text>Email: {userData.email}</Text>
//           {modelResults && (
//             <View style={styles.resultsContainer}>
//               <Text>Model Analysis:</Text>
//               {modelResults.map((modelResult) => (
//                 <View key={modelResult.modelType}>
//                   <Text>{modelResult.modelType} Analysis:</Text>
//                   {modelResult.result.detail.map((detail, index) => (
//                     <Text key={index}>{detail.label}: {detail.score}</Text>
//                   ))}
//                 </View>
//               ))}
//             </View>
//           )}
//         </>
//       ) : (
//         <Text>Loading...</Text>
//       )}
//     </View>
//   );
  

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
//   },
// });

// export default FacebookConnectScreen

// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';

// const fetchUserData = (accessToken) => {
//     return new Promise((resolve, reject) => {
//         const request = new GraphRequest(
//             '/me',
//             {
//                 accessToken: accessToken,
//                 parameters: {
//                     fields: {
//                         string: 'id,name,email,picture.type(large)', // Fetches user ID, name, email, and large profile picture
//                     },
//                 },
//             },
//             (error, result) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(result);
//                 }
//             }
//         );

//         new GraphRequestManager().addRequest(request).start();
//     });
// };

// const FacebookConnectScreen = () => {
//     const [userData, setUserData] = useState(null);
//     const [modelResults, setModelResults] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             const data = await AccessToken.getCurrentAccessToken();
//             if (data) {
//                 try {
//                     const userInfo = await fetchUserData(data.accessToken);
//                     setUserData(userInfo);
//                 } catch (error) {
//                     console.error('Error fetching user data:', error);
//                 }

//                 try {
//                     const userPosts = await fetchUserPosts(data.accessToken);
//                     const messages = userPosts.map(post => post.message).filter(Boolean); // Filter out any undefined or null messages
//                     sendDataToModel(messages);
//                 } catch (error) {
//                     console.error('Error fetching user posts:', error);
//                 }
//             }
//         };

//         fetchData();
//     }, []);

//     const fetchUserPosts = (accessToken) => {
//         return new Promise((resolve, reject) => {
//             const request = new GraphRequest(
//                 '/me/posts',
//                 {
//                     accessToken: accessToken,
//                     parameters: {
//                         fields: {
//                             string: 'id,message,created_time', // Adjust based on the data you need
//                         },
//                     },
//                 },
//                 (error, result) => {
//                     if (error) {
//                         reject(error);
//                     } else {
//                         resolve(result.data); // The posts are in the 'data' field
//                     }
//                 }
//             );

//             new GraphRequestManager().addRequest(request).start();
//         });
//     };

//     const sendDataToModel = async (messages) => {
//         const modelEndpoints = {
//             hateSpeech: 'http://192.168.0.103:8000/predict/hatespeech',
//             racism: 'http://192.168.0.103:8000/predict/racism',
//             sexism: 'http://192.168.0.103:8000/predict/sexism',
//         };

//         const modelPromises = Object.entries(modelEndpoints).map(([modelType, endpoint]) =>
//             fetch(endpoint, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ messages }),
//             })
//             .then(response => response.json())
//             .then(result => ({
//                 modelType,
//                 result,
//             }))
//             .catch(error => {
//                 console.error(`Error sending data to ${modelType} model:`, error);
//                 return { modelType, error: true, message: `Error processing ${modelType}` };
//             })
//         );

//         try {
//             const results = await Promise.all(modelPromises);
//             console.log("Model results:", results);
//             setModelResults(results);
//         } catch (error) {
//             console.error('Error sending data to models:', error);
//         }
//     };

//     return (
//       <View style={styles.container}>
//       {userData ? (
//           <>
//               <Text>Welcome, {userData.name}</Text>
//               {userData.picture?.data?.url && (
//                   <Image source={{ uri: userData.picture.data.url }} style={styles.image} />
//               )}
//               <Text>Email: {userData.email}</Text>
//               {modelResults && modelResults.map((modelResult) => (
//                   <View key={modelResult.modelType} style={styles.resultsContainer}>
//                       <Text>{modelResult.modelType} Analysis:</Text>
//                       {modelResult.result.detail && modelResult.result.detail.map((detail, index) => (
//                           <Text key={index}>{detail.label}: {detail.score}</Text>
//                       ))}
//                   </View>
//               ))}
//           </>
//       ) : (
//           <Text>Loading...</Text>
//       )}
//   </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     image: {
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//     },
//     resultsContainer: {
//       marginTop: 20,
//       alignItems: 'center',
//   },
// });

// export default FacebookConnectScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet, Alert } from 'react-native';
// import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';

// // Assuming API_URLS is defined as shown previously
// const API_URLS = {
//   hateSpeech: 'http://192.168.0.103:8000/predict/hatespeech',
//   racism: 'http://192.168.0.103:8000/predict/racism',
//   sexism: 'http://192.168.0.103:8000/predict/sexism',
// };



// const fetchUserData = (accessToken) => {
//     return new Promise((resolve, reject) => {
//         const request = new GraphRequest(
//             '/me',
//             {
//                 accessToken: accessToken,
//                 parameters: {
//                     fields: {
//                         string: 'id,name,email,picture.type(large)', // Fetches user ID, name, email, and large profile picture
//                     },
//                 },
//             },
//             (error, result) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(result);
//                 }
//             }
//         );

//         new GraphRequestManager().addRequest(request).start();
//     });
// };

// const fetchUserPosts = (accessToken) => {
//           return new Promise((resolve, reject) => {
//               const request = new GraphRequest(
//                   '/me/posts',
//                   {
//                       accessToken: accessToken,
//                       parameters: {
//                           fields: {
//                               string: 'id,message,created_time', // Adjust based on the data you need
//                           },
//                       },
//                   },
//                   (error, result) => {
//                       if (error) {
//                           reject(error);
//                       } else {
//                           resolve(result.data); // The posts are in the 'data' field
//                       }
//                   }
//               );
  
//               new GraphRequestManager().addRequest(request).start();
//           });
//       };

//       const sendDataToModel = async (messages, modelType) => {
//         try {
//           const response = await fetch(API_URLS[modelType], {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ messages }),
//           });
      
//           if (response.ok) {
//             const results = await response.json();
//             console.log(`Successfully processed content with ${modelType}:`, results);
      
//             // Assuming the response structure is an array of classification results for each message
//             // Summarize the results
//             const summary = results.reduce((acc, current) => {
//               const classification = current.classification.toLowerCase();
//               acc.total++;
//               acc[classification] = (acc[classification] || 0) + 1;
//               return acc;
//             }, { total: 0 });
      
//             return summary; // Return the summary of results instead of raw results
//           } else {
//             console.error(`API Error (${modelType}): ${response.status}`, await response.text());
//             Alert.alert('Error', `Failed to process content with ${modelType}: ${response.statusText}`);
//           }
//         } catch (error) {
//           console.error(`Error processing with ${modelType}:`, error);
//           Alert.alert('Error', `Failed to process content with ${modelType}.`);
//         }
//       };
      

// const FacebookConnectScreen = () => {
//   const [userData, setUserData] = useState(null);
//   const [modelResults, setModelResults] = useState({});

//   useEffect(() => {
//     const fetchDataAndProcess = async () => {
//       const data = await AccessToken.getCurrentAccessToken();
//       if (data) {
//         try {
//           const userInfo = await fetchUserData(data.accessToken);
//           setUserData(userInfo);

//           const userPosts = await fetchUserPosts(data.accessToken);
//           const messages = userPosts.map(post => post.message).filter(Boolean);

//           const results = await sendDataToModel(messages);
//           console.log(results)
//           setModelResults(results);
//         } catch (error) {
//           console.error('Error during data fetch or processing:', error);
//           Alert.alert('Error', 'Failed to fetch or process data.');
//         }
//       }
//     };

//     fetchDataAndProcess();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {userData ? (
//         <>
//           <Text>Welcome, {userData.name}</Text>
//           {userData.picture?.data?.url && (
//             <Image source={{ uri: userData.picture.data.url }} style={styles.image} />
//           )}
//           <Text>Email: {userData.email}</Text>
//           <View style={styles.resultsContainer}>
//             <Text>Model Analysis Results:</Text>
//             {Object.entries(modelResults).map(([modelType, result]) => (
//               <View key={modelType}>
//                 <Text>{modelType} Analysis:</Text>
//                 {/* Adapt this part based on your result structure */}
//                 <Text>Details: {JSON.stringify(result)}</Text>
//               </View>
//             ))}
//           </View>
//         </>
//       ) : (
//         <Text>Loading user data...</Text>
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
//   resultsContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
// });

// export default FacebookConnectScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const API_URLS = {
  hateSpeech: 'http://192.168.18.54:8000/predict/hatespeech',
  racism: 'http://192.168.18.54:8000/predict/racism',
  sexism: 'http://192.168.18.54:8000/predict/sexism',
};

const fetchUserData = (accessToken) => {
  return new Promise((resolve, reject) => {
    const request = new GraphRequest(
      '/me',
      {
        accessToken: accessToken,
        parameters: {
          fields: {
            string: 'id,name,email,picture.type(large)',
          },
        },
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
    new GraphRequestManager().addRequest(request).start();
  });
};

const fetchUserPosts = (accessToken) => {
  return new Promise((resolve, reject) => {
    const request = new GraphRequest(
      '/me/posts',
      {
        accessToken: accessToken,
        parameters: {
          fields: {
            string: 'id,message,created_time',
          },
        },
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.data);
        }
      },
    );
    new GraphRequestManager().addRequest(request).start();
  });
};


const processDataWithModel = async (contents, modelType) => {
  try {
    const response = await fetch(API_URLS[modelType], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comments: contents }), 
    });

    if (response.ok) {
      const results = await response.json();
      console.log(`Successfully processed content with ${modelType}:`, results);
      return results;
    } else {
      console.error(`API Error (${modelType}): ${response.status}`, await response.text());
      Alert.alert('Error', `Failed to process content with ${modelType}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error processing with ${modelType}:`, error);
    Alert.alert('Error', `Failed to process content with ${modelType}.`);
  }
};


const FacebookConnectScreen = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDataAndProcess = async () => {
      const data = await AccessToken.getCurrentAccessToken();
      if (data) {
        try {
          const userInfo = await fetchUserData(data.accessToken);
          setUserData(userInfo);

          const userPosts = await fetchUserPosts(data.accessToken);
          const messages = userPosts.map(post => post.message).filter(Boolean);
          console.log(messages)

          const hateSpeechResults = await processDataWithModel(messages, 'hateSpeech');
          const racismResults = await processDataWithModel(messages, 'racism');
          const sexismResults = await processDataWithModel(messages, 'sexism');

          console.log(hateSpeechResults)
          console.log(racismResults)
          console.log(sexismResults)


          await firestore().collection('facebookAnalysisResults').doc(userInfo.id).set({
            hateSpeechResults,
            racismResults,
            sexismResults,
          });

          // navigation.navigate('FbContentMonitoring', {
          //   userData: userInfo,
          //   analysisResults: {
          //     hateSpeech: hateSpeechResults,
          //     racism: racismResults,
          //     sexism: sexismResults,
          //   },
          // });

          navigation.navigate('Content', { messages,analysisResults: {
                hateSpeech: hateSpeechResults,
                racism: racismResults,
                sexism: sexismResults,
              } });
        } catch (error) {
          console.error('Error fetching or processing Facebook data:', error);
          Alert.alert('Error', 'Failed to fetch or process Facebook data.');
        }
      }
    };

    fetchDataAndProcess();
  }, []);

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Text style={styles.welcome}>Welcome, {userData.name}</Text>
          <Image source={{ uri: userData.picture?.data?.url }} style={styles.image} />
          <Text>Email: {userData.email}</Text>
          
          <Text>Processing your data...</Text>
        </>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  welcome:{
    fontSize: 25,
    color: "#3868D9"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    margin: "50%",
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default FacebookConnectScreen;
