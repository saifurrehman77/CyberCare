import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import PersonalityTraitsScreen from './PersonalityTraitsScreen';
import ContentMonitoringScreen from './ContentMonitoringScreen';
import BullyingStatisticsScreen from './BullyingStatisticsScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ResultsScreen from './ResultsScreen'; // Import Icon component
// Assuming ClipPath is not used since it's imported from 'react-native-svg' without being used

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: 300,
        },
        drawerLabelStyle: {
          fontSize: 13, // Adjust font size as necessary
        },
        // Optionally, you can add more styles to handle the appearance of the drawer content
      }}>
      <Drawer.Screen
        name="Dashboard"
        component={ResultsScreen}
        options={{drawerItemStyle: {display: 'none'}}}
      />
      {/* Screens with Icons */}
      <Drawer.Screen
        name="Personality Trait Analysis"
        component={PersonalityTraitsScreen}
        options={{
          drawerIcon: ({focused, color, size}) => (
            <Icon name="account-search" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Content Monitoring"
        component={ContentMonitoringScreen}
        options={{
          drawerIcon: ({focused, color, size}) => (
            <Icon name="monitor-eye" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Bullying and Harassment"
        component={BullyingStatisticsScreen}
        options={{
          drawerIcon: ({focused, color, size}) => (
            <Icon name="account-group" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
