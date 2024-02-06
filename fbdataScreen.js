import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';

const fbdatascreen = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AccessToken.getCurrentAccessToken();
      if (data) {
        // Fetch user data from Facebook
        const userInfo = await fetchUserData(data.accessToken);
        setUserData(userInfo);
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
  

  // Render user data or a login button
  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Text>Welcome, {userData.name}</Text>
          <Image source={{ uri: userData.picture.data.url }} style={styles.image} />
          <Text>Email: {userData.email}</Text>
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
});

export default fbdatascreen;
