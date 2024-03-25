// CustomDrawerContent.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // You can choose other icon libraries

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: 'white' }}>
      <View style={styles.drawerHeader}>
        <Image
          source={require('./assets/logo.png')} // Replace with the path to your logo image
          style={styles.logoStyle}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    height: 150, // Adjust the height as needed
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', // Choose your preferred shade of green
  },
  logoStyle: {
    width: 100, // Adjust the size as needed
    height: 100, // Adjust the size as needed
  },
});

export default CustomDrawerContent;
