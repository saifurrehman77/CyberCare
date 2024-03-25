// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const ResultsScreen = ({ route }) => {
//   const mlResults = Array.isArray(route.params.mlResults) ? route.params.mlResults : [];

//   console.log('ML Results on ResultsScreen:', mlResults);

//   // Example logic to display results, adjust based on your actual data structure
//   return (
//     <View style={styles.container}>
//       <Text>Results:</Text>
//       {mlResults && mlResults.map((result, index) => (
//         <Text key={index}>{result.label}: {result.value}</Text>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   // Add more styles as needed
// });

// export default ResultsScreen;
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { PieChart } from 'react-native-chart-kit';

// const ResultsScreen = ({ route }) => {
//   const { mlResults } = route.params;

//   // Prepare the data for the pie chart
//   const pieChartData = [
//     {
//       name: 'Hatespeech',
//       count: mlResults.hatespeech_comments,
//       color: '#E38627',
//       legendFontColor: '#7F7F7F',
//       legendFontSize: 15,
//     },
//     {
//       name: 'Offensive',
//       count: mlResults.offensive_comments,
//       color: '#C13C37',
//       legendFontColor: '#7F7F7F',
//       legendFontSize: 15,
//     },
//     {
//       name: 'Neither',
//       count: mlResults.neither_comments,
//       color: '#6A2135',
//       legendFontColor: '#7F7F7F',
//       legendFontSize: 15,
//     },
//   ];

//   const chartConfig = {
//     backgroundGradientFrom: '#1E2923',
//     backgroundGradientFromOpacity: 0,
//     backgroundGradientTo: '#08130D',
//     backgroundGradientToOpacity: 0.5,
//     color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//     strokeWidth: 2, // optional, default 3
//     barPercentage: 0.5,
//     useShadowColorFromDataset: false, // optional
//   };

//   console.log('Chart Config:', chartConfig);

//   // Adjust styling as eeded
//   const screenWidth = 320; // Replace with your screen width

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Results:</Text>
//       <PieChart
//         data={pieChartData}
//         width={screenWidth}
//         height={220}
//         chartConfig={chartConfig}
//         accessor="count"
//         backgroundColor="transparent"
//         paddingLeft="15"
//         center={[screenWidth / 4, 0]}
//         absolute
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   // Add more styles as needed
// });

// export default ResultsScreen;

// import React from 'react';
// import { View, Text, Dimensions, StyleSheet } from 'react-native';
// import { PieChart } from 'react-native-chart-kit';

// const ResultsScreen = ({ route }) => {
//   // Extract combinedResults from navigation parameters
//   const { combinedResults } = route.params;
//   console.log(route.params)

//   // Prepare the chart data based on the combinedResults
//   const prepareChartData = () => {
//     return [
//       {
//         name: 'Hate Speech',
//         count: combinedResults.hateSpeechResults['Hate Speech Comments'], // Adjusted
//         color: '#E38627',
//         legendFontColor: '#7F7F7F',
//         legendFontSize: 15,
//       },
//       {
//         name: 'Racist',
//         count: combinedResults.racismResults['Racist Comments'], // Adjusted
//         color: '#C13C37',
//         legendFontColor: '#7F7F7F',
//         legendFontSize: 15,
//       },
//       {
//         name: 'Sexist',
//         count: combinedResults.sexismResults['Sexist Comments'], // Adjusted
//         color: '#6A2135',
//         legendFontColor: '#7F7F7F',
//         legendFontSize: 15,
//       },
//     ];
//   };


//   const chartData = prepareChartData();
//   const screenWidth = Dimensions.get('window').width;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Analysis Results</Text>
//       <PieChart
//         data={chartData}
//         width={screenWidth}
//         height={220}
//         chartConfig={{
//           backgroundColor: '#ffffff',
//           backgroundGradientFrom: '#ffffff',
//           backgroundGradientTo: '#ffffff',
//           decimalPlaces: 2,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//         }}
//         accessor={'count'}
//         backgroundColor={'transparent'}
//         paddingLeft={'15'}
//         center={[screenWidth / 4, 0]}
//         absolute
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
// });

// export default ResultsScreen;



// import React from 'react';
// import { View, Text, Dimensions, StyleSheet } from 'react-native';
// import { BarChart } from 'react-native-gifted-charts';

// const ResultsScreen = ({ route }) => {
//   const { combinedResults } = route.params;

//   const prepareChartData = () => {
//     return [
//       {
//         value: combinedResults.hateSpeechResults['Hate Speech Comments'],
//         label: 'Hate Speech',
//         frontColor: '#E38627', // Using the color as frontColor for consistency with BarChart
//       },
//       {
//         value: combinedResults.racismResults['Racist Comments'],
//         label: 'Racist',
//         frontColor: '#C13C37',
//       },
//       {
//         value: combinedResults.sexismResults['Sexist Comments'],
//         label: 'Sexist',
//         frontColor: '#6A2135',
//       },
//     ];
//   };
//   const chartData = prepareChartData();
//   const screenWidth = Dimensions.get('window').width;

// const ResultsScreen = ({ route }) => {
//   const combinedResults = route.params?.combinedResults || {
//     hateSpeechResults: { 'Hate Speech Comments': 0 },
//     racismResults: { 'Racist Comments': 0 },
//     sexismResults: { 'Sexist Comments': 0 },
//   };

//   const prepareChartData = () => {
//     const totalComments = combinedResults.hateSpeechResults['Hate Speech Comments'] +
//                           combinedResults.racismResults['Racist Comments'] +
//                           combinedResults.sexismResults['Sexist Comments'];
//                           console.log(totalComments)
//                           console.log(combinedResults.hateSpeechResults)
//                           console.log(combinedResults.racismResults)
//                           console.log(combinedResults.sexismResults)

//     return [
//       {
//         value: ((combinedResults.hateSpeechResults['Hate Speech Comments'] / totalComments) * 100).toFixed(2),
//         label: 'Hate Speech',
//         frontColor: '#E38627',
//       },
//       {
//         value: (combinedResults.racismResults['Racist Comments'] / totalComments * 100).toFixed(2),
//         label: 'Racist',
//         frontColor: '#C13C37',
//       },
//       {
//         value: (combinedResults.sexismResults['Sexist Comments'] / totalComments * 100).toFixed(2),
//         label: 'Sexist',
//         frontColor: '#6A2135',
//       },
//     ].map(item => ({ ...item, value: parseFloat(item.value) })); // Convert string percentages back to numbers for the chart
//   };


//   const chartData = prepareChartData();
//   const screenWidth = Dimensions.get('window').width;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Analysis Results</Text>
//       <View style={styles.chartContainer}>
//         <BarChart
//           data={chartData}
//           width={screenWidth - 60} // Subtracting margin from both sides
//           height={220}
//           barWidth={30}
//           noOfSections={5}
//           barBorderRadius={5}
//           yAxisThickness={0}
//           xAxisThickness={0}
//           yAxisLabelTexts={['0%', '20%', '40%', '60%', '80%', '100%']} // Assuming 100% is the max value
//           showBarTops={false}
//           spacing={50}
//           showYAxisIndices={false}
//           withHorizontalLabels={false}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 50,
//     alignItems: 'center',
//     backgroundColor: '#eef9f0',
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   chartContainer: {
//     borderWidth: 1,
//     borderColor: 'rgba(0, 0, 0, 0.1)', // Transparent border color
//     borderRadius: 16,
//     width: '90%', // Adjust the width as necessary
//     padding: 10, // Add padding to create space inside the border
//     marginTop: 10, // Move the chart a bit down for aesthetic spacing
//   },
// });

// export default ResultsScreen;

// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import Animated, { useAnimatedStyle, withSpring, interpolate, useSharedValue } from 'react-native-reanimated';

// const { width: screenWidth } = Dimensions.get('window');

// const ResultsScreen = ({ route }) => {
//   const { combinedResults } = route.params;

//   const prepareChartData = () => {
//     return [
//       {
//         value: combinedResults.hateSpeechResults['Hate Speech Comments'],
//         label: 'Hate Speech',
//         frontColor: '#E38627', // Using the color as frontColor for consistency with BarChart
//       },
//       {
//         value: combinedResults.racismResults['Racist Comments'],
//         label: 'Racist',
//         frontColor: '#C13C37',
//       },
//       {
//         value: combinedResults.sexismResults['Sexist Comments'],
//         label: 'Sexist',
//         frontColor: '#6A2135',
//       },
//     ];
//   };
//   const chartData = prepareChartData();
//   const screenWidth = Dimensions.get('window').width



//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Analysis Results</Text>
//       <View style={styles.chartContainer}>
//         {/* BarChart component - Assuming you have the chart setup */}
//       </View>
//       <ProfileCard />
//     </View>
//   );
// };

// const ProfileCard = () => {
//   const [showDetails, setShowDetails] = useState(false);
//   const rotateY = useSharedValue(0);

//   const frontAnimatedStyle = useAnimatedStyle(() => {
//     const rotate = interpolate(rotateY.value, [0, 180], [0, -180]);
//     return {
//       transform: [{ perspective: 1000 }, { rotateY: `${rotate}deg` }],
//       opacity: rotateY.value <= 90 ? 1 : 0,
//     };
//   });

//   const backAnimatedStyle = useAnimatedStyle(() => {
//     const rotate = interpolate(rotateY.value, [0, 180], [180, 0]);
//     return {
//       transform: [{ perspective: 1000 }, { rotateY: `${rotate}deg` }],
//       opacity: rotateY.value > 90 ? 1 : 0,
//     };
//   });

//   const handlePress = () => {
//     setShowDetails(!showDetails);
//     rotateY.value = withSpring(showDetails ? 0 : 180, { damping: 10, stiffness: 100 });
//   };

//   return (
//     <View style={[styles.container, { marginTop: 20 }]}>
//       <TouchableOpacity activeOpacity={1} onPress={handlePress}>
//         <Animated.View style={[styles.card, frontAnimatedStyle]}>
//           <View style={styles.imageContainer}>
//             <Image
//               style={styles.image}
//               source={{ uri: 'https://media.istockphoto.com/id/1042424400/photo/teenager-with-afro-hair-style.jpg?s=612x612&w=0&k=20&c=ItyWr7CYUor8AMu1YZrtHkh8ZOPKGPZd1U8EMWJiskE=' }}
//             />
//           </View>
//           <View style={styles.info}>
//             <Text style={[styles.name, { fontFamily: 'Poppins_700Bold' }]}>
//               Alina Smith
//             </Text>
//             <Text style={[styles.title, { fontFamily: 'Poppins_400Regular' }]}>
//               Senior UX/UI Designer
//             </Text>
//           </View>
//         </Animated.View>

//         <Animated.View style={[styles.card, backAnimatedStyle, styles.cardBack]}>
//           <View style={styles.detailsContainer}>
//             <Text style={[styles.detailsText, { fontFamily: 'Poppins_400Regular' }]}>
//               @alina_design
//             </Text>
//           </View>
//           <View style={styles.detailsContainer}>
//             <Text style={[styles.detailsText, { fontFamily: 'Poppins_400Regular' }]}>
//               1020 Tweets
//             </Text>
//           </View>
//         </Animated.View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#E6E6FA',
//   },
//   // Rest of your StyleSheet remains the same...
// });


// import React from 'react';
// import { View, Text, Dimensions, StyleSheet } from 'react-native';
// import { BarChart } from 'react-native-gifted-charts';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// const Drawer = createDrawerNavigator();

// const BullyingStatisticsScreen = () => (
//   <View style={styles.screenContainer}>
//     <Text>Bullying Statistics</Text>
//   </View>
// );

// const ContentMonitoringScreen = () => (
//   <View style={styles.screenContainer}>
//     <Text>Content Monitoring</Text>
//   </View>
// );

// const PersonalityTraitsScreen = () => (
//   <View style={styles.screenContainer}>
//     <Text>Personality Traits</Text>
//   </View>
// );

// // Define a new component for the Results
// const ResultsComponent = ({ route }) => {
//   const { combinedResults } = route.params;

//   // Your existing logic for prepareChartData and prepareLastThreeDaysData

//   const chartData = [
//     {
//       value: combinedResults.hateSpeechResults['Hate Speech Comments'],
//       label: 'Hate Speech',
//       frontColor: '#E38627',
//     },
//     {
//       value: combinedResults.racismResults['Racist Comments'],
//       label: 'Racist',
//       frontColor: '#C13C37',
//     },
//     {
//       value: combinedResults.sexismResults['Sexist Comments'],
//       label: 'Sexist',
//       frontColor: '#6A2135',
//     },
//   ];

//   const lastThreeDaysData = [
//     { value: 10, label: 'Day 1', frontColor: '#E38627' },
//     { value: 20, label: 'Day 2', frontColor: '#C13C37' },
//     { value: 15, label: 'Day 3', frontColor: '#6A2135' },
//   ];

//   const screenWidth = Dimensions.get('window').width;

//   return (
//     <View style={styles.container}>
//       <View style={[styles.chartContainer, { marginBottom: 20 }]}>
//         <Text style={styles.chartLabel}>Comments Analysis</Text>
//         <BarChart
//           data={chartData}
//           width={screenWidth - 60}
//           height={220}
//           barWidth={30}
//           noOfSections={5}
//           barBorderRadius={5}
//           yAxisThickness={0}
//           xAxisThickness={0}
//           yAxisLabelTexts={['0%', '20%', '40%', '60%', '80%', '100%']}
//           showBarTops={false}
//           spacing={50}
//           showYAxisIndices={false}
//           withHorizontalLabels={false}
//         />
//       </View>
//       <View style={styles.chartContainer}>
//         <Text style={styles.chartLabel}>Results for Last 3 Days</Text>
//         <BarChart
//           data={lastThreeDaysData}
//           width={screenWidth - 60}
//           height={220}
//           barWidth={30}
//           noOfSections={5}
//           spacing={50}
//           barBorderRadius={5}
//           yAxisThickness={0}
//           xAxisThickness={0}
//         />
//       </View>
//     </View>
//   );
// };

// const ResultsScreen = ({ route }) => {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Bullying Statistics" component={BullyingStatisticsScreen} />
//       <Drawer.Screen name="Content Monitoring" component={ContentMonitoringScreen} />
//       <Drawer.Screen name="Personality Traits" component={PersonalityTraitsScreen} />
//       <Drawer.Screen
//         name="Results"
//         options={{ drawerLabel: 'Back to Results' }}
//         component={ResultsComponent} // Here, use the ResultsComponent
//       />
//     </Drawer.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 10,
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   screenContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   chartContainer: {
//     borderWidth: 1,
//     borderColor: 'rgba(0, 0, 0, 0.1)',
//     borderRadius: 16,
//     width: '90%',
//     padding: 10,
//     marginTop: 5,
//   },
//   chartLabel: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
// });

// export default ResultsScreen;




// import React from 'react';
// import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
// import { BarChart } from 'react-native-gifted-charts';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Ensure you've installed react-native-vector-icons

// const Drawer = createDrawerNavigator();

// const BullyingStatisticsScreen = () => (
//   <View style={styles.screenContainer}>
//     <Text>Bullying Statistics</Text>
//   </View>
// );

// const ContentMonitoringScreen = () => (
//   <View style={styles.screenContainer}>
//     <Text>Content Monitoring</Text>
//   </View>
// );

// const PersonalityTraitsScreen = () => (
//   <View style={styles.screenContainer}>
//     <Text>Personality Traits</Text>
//   </View>
// );

// const ResultsComponent = ({ route }) => {
//   const { combinedResults } = route.params;
//   const chartData = [
//     {
//       value: combinedResults.hateSpeechResults['Hate Speech Comments'],
//       label: 'Hate Speech',
//       frontColor: '#E38627',
//     },
//     {
//       value: combinedResults.racismResults['Racist Comments'],
//       label: 'Racist',
//       frontColor: '#C13C37',
//     },
//     {
//       value: combinedResults.sexismResults['Sexist Comments'],
//       label: 'Sexist',
//       frontColor: '#6A2135',
//     },
//   ];

//   const lastThreeDaysData = [
//     { value: 10, label: 'Day 1', frontColor: '#E38627' },
//     { value: 20, label: 'Day 2', frontColor: '#C13C37' },
//     { value: 15, label: 'Day 3', frontColor: '#6A2135' },
//   ];

//   const screenWidth = Dimensions.get('window').width;

//   return (
//     <View style={styles.container}>
//       <View style={[styles.chartContainer, { marginBottom: 20 }]}>
//         <Text style={styles.chartLabel}>Comments Analysis</Text>
//         <BarChart
//           data={chartData}
//           width={screenWidth - 60}
//           height={220}
//           barWidth={30}
//           noOfSections={5}
//           barBorderRadius={5}
//           yAxisThickness={0}
//           xAxisThickness={0}
//           yAxisLabelTexts={['0%', '20%', '40%', '60%', '80%', '100%']}
//           showBarTops={false}
//           spacing={50}
//           showYAxisIndices={false}
//           withHorizontalLabels={false}
//         />
//       </View>
//       <View style={styles.chartContainer}>
//         <Text style={styles.chartLabel}>Results for Last 3 Days</Text>
//         <BarChart
//           data={lastThreeDaysData}
//           width={screenWidth - 60}
//           height={220}
//           barWidth={30}
//           noOfSections={5}
//           spacing={50}
//           barBorderRadius={5}
//           yAxisThickness={0}
//           xAxisThickness={0}
//         />
//       </View>
//     </View>
//   );

// };

// const CustomDrawerContent = (props) => {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//     </DrawerContentScrollView>
//   );
// };

// const ResultsScreen = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator
//         initialRouteName="ResultsScreen"
//         screenOptions={({ navigation }) => ({
//           headerShown: true,
//           headerTitle: 'Analysis Results',
//           headerLeft: () => (
//             <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
//               <Icon name="ios-menu" size={30} style={{ marginLeft: 10 }} />
//             </TouchableOpacity>
//           ),
//         })}
//       >
//         <Drawer.Screen name="ResultsScreen" component={ResultsScreen} />
//         <Drawer.Screen name="Bullying and Harassment" component={BullyingStatisticsScreen} />
//         <Drawer.Screen name="Content Monitoring" component={ContentMonitoringScreen} />
//         <Drawer.Screen name="Personality Trait Analysis" component={PersonalityTraitsScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 10,
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   screenContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   chartContainer: {
//     borderWidth: 1,
//     borderColor: 'rgba(0, 0, 0, 0.1)',
//     borderRadius: 16,
//     width: '90%',
//     padding: 10,
//     marginTop: 5,
//   },
//   chartLabel: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
// });

// export default ResultsScreen;

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import Animated, { useAnimatedStyle, withSpring, interpolate, useSharedValue } from 'react-native-reanimated';
import { List } from 'react-native-paper';





const { width: screenWidth } = Dimensions.get('window');

const ResultsScreen = ({ route }) => {
  const combinedResults = route.params?.combinedResults || {
    hateSpeechResults: { 'Hate Speech Comments': 0 },
    racismResults: { 'Racist Comments': 0 },
    sexismResults: { 'Sexist Comments': 0 },
  };

  const user = route.params?.user
  console.log(user)

  const tweetcount = route.params?.tweetcount
  console.log(tweetcount)

  const prepareChartData = () => {
    const totalComments =
      combinedResults.hateSpeechResults['Hate Speech Comments'] +
      combinedResults.racismResults['Racist Comments'] +
      combinedResults.sexismResults['Sexist Comments'];

    return [
      {
        value: ((combinedResults.hateSpeechResults['Hate Speech Comments'] / totalComments) * 100).toFixed(2),
        label: 'Hate Speech',
        frontColor: '#E38627',
      },
      {
        value: ((combinedResults.racismResults['Racist Comments'] / totalComments) * 100).toFixed(2),
        label: 'Racist',
        frontColor: '#C13C37',
      },
      {
        value: ((combinedResults.sexismResults['Sexist Comments'] / totalComments) * 100).toFixed(2),
        label: 'Sexist',
        frontColor: '#6A2135',
      },
    ].map(item => ({ ...item, value: parseFloat(item.value) }));
  };

  const chartData = prepareChartData();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>CyberCare</Text>
      <Text style={styles.smallText}>Guarding Digital Futures</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={screenWidth - 60} // Subtracting margin from both sides
          height={220}
          barWidth={30}
          noOfSections={5}
          barBorderRadius={5}
          yAxisThickness={0}
          xAxisThickness={0}
          yAxisLabelTexts={['0%', '20%', '40%', '60%', '80%', '100%']} // Assuming 100% is the max value
          showBarTops={false}
          spacing={50}
          showYAxisIndices={false}
          withHorizontalLabels={false}
        />
      </View>
      <ProfileCard user={user} tweetcount={tweetcount.length} />
    </View>
  );
};

const ProfileCard = ({ user, tweetcount }) => {
  const [showDetails, setShowDetails] = useState(false);
  const rotateY = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(rotateY.value, [0, 180], [0, -180], 'clamp');
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotate}deg` }],
      opacity: rotateY.value <= 90 ? 1 : 0,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(rotateY.value, [0, 180], [180, 0], 'clamp');
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotate}deg` }],
      opacity: rotateY.value > 90 ? 1 : 0,
    };
  });

  const handlePress = () => {
    setShowDetails(!showDetails);
    rotateY.value = withSpring(showDetails ? 0 : 180, { damping: 10, stiffness: 100 });
  };

  // const profileInfo = {
  //   name: "Alina Smith",
  //   email: "alina@example.com",
  //   bio: "Senior UX/UI Designer with a passion for creating memorable digital experiences.",
  //   location: "San Francisco, CA"
  // };

  // return (
  //   <View style={{ marginTop: 20, alignItems: 'center' }}>
  //     <TouchableOpacity activeOpacity={1} onPress={handlePress}>
  //       <Animated.View style={[styles.card, frontAnimatedStyle]}>
  //         {/* Card Front View */}
  //         <Text style={styles.name}>{user.name}</Text>
  //         <Text style={styles.detail}>{user.email}</Text>
  //         <Text style={styles.detail}>{tweetcount}</Text>
  //       </Animated.View>

  //       <Animated.View style={[styles.card, backAnimatedStyle, styles.cardBack]}>
  //         {/* Card Back View */}
  //         <Text style={styles.detail}>{user.bio}</Text>
  //         <Text style={styles.detail}>{user.location}</Text>
  //       </Animated.View>
  //     </TouchableOpacity>
  //   </View>
  return (
    <View style={{ marginTop: 20, alignItems: 'center' }}>
      <TouchableOpacity activeOpacity={1} onPress={handlePress}>
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('./assets/download.png')}// Fallback to a placeholder if user.img is not available
            />
          </View>
          <View style={styles.info}>
            <Text style={[styles.name]}>{user.name}</Text>
            <Text style={[styles.detail]}>{user.email}</Text>
            <Text style={[styles.detail]}>Tweets: {tweetcount}</Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.card, backAnimatedStyle, styles.cardBack]}>
          <View style={styles.info}>
            <View style={styles.iconRow}>
              <List.Icon color="#1DA1F2" icon="twitter" />
              <Text style={[styles.detail, styles.twitterId]}>
                {user.username}
              </Text>
            </View>
            <View style={styles.iconRow}>
              <List.Icon color="#333" icon="account" />
              <Text style={[styles.detail, styles.bio]}>
                {user.bio}
              </Text>
            </View>
            <View style={styles.iconRow}>
              <List.Icon color="#FF6347" icon="map-marker" />
              <Text style={[styles.detail, styles.location]}>
                {user.location}
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 50,
//     alignItems: 'center',
//     backgroundColor: '#eef9f0',
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   chartContainer: {
//     borderWidth: 1,
//     borderColor: 'rgba(0, 0, 0, 0.1)',
//     borderRadius: 16,
//     width: '90%',
//     padding: 10,
//     marginTop: 10,
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     paddingVertical: 20,
//     paddingHorizontal: 15,
//     alignItems: 'center',
//     width: screenWidth * 0.85, // Adjusted to fit within the screen width
//     minHeight: 250,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   cardBack: {
//     position: 'absolute',
//     top: 0,
//   },
//   imageContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     overflow: 'hidden',
//     marginBottom: 16,
//     borderWidth: 4,
//     borderColor: '#f2f2f2',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   info: {
//     alignItems: 'center',
//   },
//   name: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     marginBottom: 4,
//     color: '#333',
//   },
//   title: {
//     fontSize: 16,
//     marginBottom: 12,
//     color: '#555',
//   },
//   detailsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   detail: {
//     fontSize: 14,
//     color: '#888',
//   },
// });

const styles = StyleSheet.create({
  text:{
    marginTop: -40,
    fontSize: 32,
    color: "black",
    fontWeight: "bold",
    marginLeft: -150
  },
  smallText:{
    fontWeight: "800",
    fontSize: 16,
    color: "#3868D9",
    fontFamily: "Brittany",
    marginLeft: -8
  },
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#d4e0fc',
  },
  logo: {
    height: 50, // Adjust the height accordingly
    width: screenWidth * 0.85, // Same width as the cards for consistency
    marginTop: -29, // Add some top margin
  },
  chartContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 16,
    width: '90%',
    padding: 10,
    marginTop: 10,
    color: "black",
    backgroundColor: '#ffffff', // Background color is needed for iOS shadow to be visible
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0, // Horizontal shadow offset
      height: 4, // Vertical shadow offset
    },
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 6, // Shadow blur radius
    elevation: 3, // Elevation for Android shadow
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: screenWidth * 0.85,
    minHeight: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    backfaceVisibility: 'hidden', // Hide the back of the card when it is flipped
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#f2f2f2',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  info: {
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
    color: '#333',
  },
  detail: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  cardBack: {
    backgroundColor: '#eef9f0', // you might want to change the background color for the back card
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.85,
    minHeight: 300,
    position: 'absolute',
    top: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    backfaceVisibility: 'hidden',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  twitterId: {
    fontSize: 16,
    color: '#1DA1F2',
    marginLeft: 10,
  },
  bio: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  location: {
    fontSize: 16,
    color: '#FF6347',
    marginLeft: 20,
  },
});


export default ResultsScreen