// import React from 'react';
// import { View, Text, Dimensions, StyleSheet } from 'react-native';
// import { BarChart } from 'react-native-gifted-charts';

// const ContentMonitoringScreen = ({ route }) => {
//     console.log(route.params)
//     const combinedResults = route.params?.combinedResults || {
//       hateSpeechResults: { 'Hate Speech Comments': 0 },
//       racismResults: { 'Racist Comments': 0 },
//       sexismResults: { 'Sexist Comments': 0 },
//     };

//     const prepareChartData = () => {
//       return [
//         {
//           value: combinedResults.hateSpeechResults['Hate Speech Comments'],
//           label: 'Hate Speech',
//           frontColor: '#E38627',
//         },
//         {
//           value: combinedResults.racismResults['Racist Comments'],
//           label: 'Racist',
//           frontColor: '#C13C37',
//         },
//         {
//           value: combinedResults.sexismResults['Sexist Comments'],
//           label: 'Sexist',
//           frontColor: '#6A2135',
//         },
//       ];
//     };

//     const chartData = prepareChartData();
//     const screenWidth = Dimensions.get('window').width;

//     return (
//       <View style={styles.container}>
//         <Text style={styles.header}>Analysis Results</Text>
//         <View style={styles.chartContainer}>
//           <BarChart
//             data={chartData}
//             width={screenWidth - 60} // Subtracting margin from both sides
//             height={220}
//             barWidth={30}
//             noOfSections={5}
//             barBorderRadius={5}
//             yAxisThickness={0}
//             xAxisThickness={0}
//             yAxisLabelTexts={['0%', '20%', '40%', '60%', '80%', '100%']} // Assuming 100% is the max value
//             showBarTops={false}
//             spacing={50}
//             showYAxisIndices={false}
//             withHorizontalLabels={false}
//           />
//         </View>
//       </View>
//     );
//   };

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       paddingTop: 50,
//       alignItems: 'center',
//       backgroundColor: '#eef9f0',
//     },
//     header: {
//       fontSize: 22,
//       fontWeight: 'bold',
//       marginBottom: 20,
//     },
//     chartContainer: {
//       borderWidth: 1,
//       borderColor: 'rgba(0, 0, 0, 0.1)', // Transparent border color
//       borderRadius: 16,
//       width: '90%', // Adjust the width as necessary
//       padding: 10, // Add padding to create space inside the border
//       marginTop: 10, // Move the chart a bit down for aesthetic spacing
//     },
//   });

//   export default ContentMonitoringScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Dimensions, StyleSheet, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
// import { PieChart } from "react-native-gifted-charts";

// const screenWidth = Dimensions.get('window').width;

// const ContentMonitoringScreen = ({ route }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [comments, setComments] = useState([]); // This will store combined details

//   useEffect(() => {
//     // This effect will combine details when route.params updates
//     if (route.params?.combinedResults) {
//       const { hateSpeechResults, racismResults, sexismResults } = route.params.combinedResults;
//       const combinedDetails = [
//         ...hateSpeechResults.Details,
//         ...racismResults.Details,
//         ...sexismResults.Details
//       ];
//       setComments(combinedDetails);
//     }
//   }, [route.params]);

//   const combinedResults = route.params?.combinedResults || {
//     hateSpeechResults: { 'Hate Speech Comments': 0, 'Total Comments': 0 },
//     racismResults: { 'Racist Comments': 0, 'Total Comments': 0 },
//     sexismResults: { 'Sexist Comments': 0, 'Total Comments': 0 },
//   };

//   const totalComments = Object.keys(combinedResults).reduce(
//     (sum, key) => sum + combinedResults[key]['Total Comments'], 0);

//   const pieData = [
//     { value: route.params?.combinedResults?.hateSpeechResults['Hate Speech Comments'] || 0, color: '#eaa361', text: 'Hate Speech', legendFontColor: '#333333', legendFontSize: 15,percentage: ((combinedResults.hateSpeechResults['Hate Speech Comments'] / totalComments) * 100).toFixed(1) },
//     { value: route.params?.combinedResults?.racismResults['Racist Comments'] || 0, color: '#aedded', text: 'Racism', legendFontColor: '#333333', legendFontSize: 15,percentage: ((combinedResults.racismResults['Racist Comments'] / totalComments) * 100).toFixed(1) },
//     { value: route.params?.combinedResults?.sexismResults['Sexist Comments'] || 0, color: '#2a4f65', text: 'Sexism', legendFontColor: '#333333', legendFontSize: 15,percentage: ((combinedResults.sexismResults['Sexist Comments'] / totalComments) * 100).toFixed(1) },
//     { value: route.params?.combinedResults?.hateSpeechResults['Offensive Comments'] || 0, color: 'coral', text: 'Offensive', legendFontColor: '#333333', legendFontSize: 15,percentage: ((combinedResults.hateSpeechResults['Offensive Comments'] / totalComments) * 100).toFixed(1) },
//   ].map(item => ({ ...item, label: `${item.text} - ${item.percentage}%` }));

//     return (
//         <View style={styles.container}>
//           <Text style={styles.header}>Content Monitoring</Text>
//           <View style={styles.chartContainer}>

//             <PieChart
//               data={pieData}
//               width={screenWidth}
//               height={220}
//               chartConfig={{
//                 backgroundColor: '#ffffff',
//                 backgroundGradientFrom: '#ffffff',
//                 backgroundGradientTo: '#ffffff',
//                 color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//               }}
//               accessor={"value"}
//               backgroundColor={"transparent"}
//               paddingLeft={"15"}
//               center={[screenWidth / 4, 0]}
//               absolute
//               hasLegend={false}
//               doughnut={true}
//               innerRadius={"50%"}
//             // Removed onPress to select categories as it's not defined in this snippet
//             />
//             <View style={styles.legendContainer}>
//               {pieData.map((item, index) => (
//                 <View key={index} style={styles.legendItem}>
//                   <View style={[styles.dot, { backgroundColor: item.color }]} />
//                   <Text style={styles.legendText}>{`${item.text}  ${item.percentage}%`}</Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//           <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.commentButton}>
//             <Text style={styles.commentButtonText}>View Comments</Text>
//           </TouchableOpacity>
//           <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(!modalVisible)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalView}>
//             <Text style={styles.commentsTitle}>Comments</Text>
//             <ScrollView style={{ maxHeight: 400 }}>
//   {comments.map((comment, index) => (
//     <View key={index} style={styles.commentContainer}>
//       <Text style={styles.commentLabel}>Comment:</Text>
//       <Text style={styles.commentText}>{comment.comment}</Text>
//       <Text style={styles.predictionLabel}>Prediction:</Text>
//       <Text style={styles.predictionText}>{comment.prediction}</Text>
//     </View>
//   ))}
// </ScrollView>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#d4e0fc',
//     },
//     header: {
//       fontSize: 26,
//       fontWeight: '700',
//       marginTop: 60,
//       marginBottom: 30,
//       color: 'black',
//       alignSelf: 'center',
//       fontFamily: 'Poppins',
//     },
//     chartContainer: {
//       backgroundColor: '#FFFFFF',
//       alignItems: 'center',
//       marginBottom: 30,
//       borderRadius: 30,
//       margin: 20,
//       padding: 25,
//       shadowColor: "#000",
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4.65,
//       elevation: 8,
//     },
//     legendContainer: {
//       flexDirection: 'column',
//       justifyContent: 'center',
//       marginTop: 15,
//     },
//     legendItem: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginHorizontal: 15,
//     },
//     dot: {
//       width: 12,
//       height: 12,
//       borderRadius: 6,
//       marginRight: 8,
//     },
//     legendText: {
//       fontSize: 15,
//       color: '#34495E',
//       fontFamily: 'Roboto-Regular', // Using Roboto-Regular font
//     },
//     modalContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalView: {
//       backgroundColor: '#FFFFFF',
//       borderRadius: 20,
//       padding: 25,
//       width: '90%',
//       alignItems: 'center',
//       shadowColor: "#000",
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4.65,
//       elevation: 8,
//     },
//     commentsTitle: {
//       fontSize: 22,
//       fontWeight: 'bold',
//       marginBottom: 15,
//       color: '#34495E',
//       fontFamily: 'Poppins',
//     },
//     commentText: {
//       color: 'black',
//       fontSize: 16,
//       fontFamily: 'Poppins',
//     },
//     closeButton: {
//       backgroundColor: '#3868D9',
//       padding: 12,
//       borderRadius: 20,
//       marginTop: 20,
//       paddingHorizontal: 30,
//     },
//     closeButtonText: {
//       color: '#FFFFFF',
//       fontSize: 18,
//       fontWeight: 'bold',
//       fontFamily: 'Poppins',
//     },
//     commentButton: {
//       backgroundColor: '#3868D9',
//       padding: 12,
//       borderRadius: 20,
//       marginTop: 20,
//       alignSelf: 'center',
//       paddingHorizontal: 30,
//     },
//     commentButtonText: {
//       color: '#FFFFFF',
//       fontSize: 18,
//       fontWeight: 'bold',
//       textAlign: 'center',
//       fontFamily: 'Roboto-Bold', // Using Roboto-Bold font
//     },
//     commentContainer: {
//         marginBottom: 10,
//         padding: 10,
//         backgroundColor: '#f7f7f7',
//         borderRadius: 5,
//       },
//       commentLabel: {
//         fontWeight: 'bold',
//         marginBottom: 4,
//       },
//       commentText: {
//         // styling for comment text
//       },
//       predictionLabel: {
//         fontWeight: 'bold',
//         marginTop: 6,
//         marginBottom: 4,
//       },
//       predictionText: {
//         // styling for prediction text
//       },

//   });
// export default ContentMonitoringScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Dimensions, StyleSheet, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
// import { PieChart } from "react-native-gifted-charts";
// import { Picker } from '@react-native-picker/picker';
// import { useUser } from './userContext';

// const screenWidth = Dimensions.get('window').width;

// const ContentMonitoringScreen = ({ route }) => {
//   const {isfetchUserStatusAndComments,setisfetchUserStatusAndComments,combinedResults} = useUser();
//   console.log("Hello",isfetchUserStatusAndComments)
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedTimePeriod, setSelectedTimePeriod] = useState('overall');
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     if (combinedResults) {
//       const results = combinedResults;
//       if (results) {
//         const combinedDetails = [
//           ...results?.hateSpeechResults?.Details || [],
//           ...results?.racismResults?.Details || [],
//           ...results?.sexismResults?.Details || []
//         ];
//         setComments(combinedDetails);
//       }
//     }
//   }, [combinedResults]);

//   useEffect(() => {
//     if (selectedTimePeriod) {
//       setisfetchUserStatusAndComments(selectedTimePeriod)
//     }

//   },[selectedTimePeriod] )

//   function calculatePercentage(value) {
//     const totalComments = route.params?.combinedResults[selectedTimePeriod]?.totalComments || 1;
//     return ((value / totalComments) * 100).toFixed(1) + '%';
//   }

//   console.log("How are you",combinedResults)
//   const pieData = [
//     { value: combinedResults?.hateSpeechResults['Hate Speech Comments'] || 0, color: '#eaa361', text: 'Hate Speech',  },
//     { value: combinedResults?.racismResults['Racist Comments'] || 0, color: '#aedded', text: 'Racism',  },
//     { value: combinedResults?.sexismResults['Sexist Comments'] || 0, color: '#2a4f65', text: 'Sexism', },
//     { value: combinedResults?.hateSpeechResults['Offensive Comments'] || 0, color: 'coral', text: 'Offensive',  },
//     { value: combinedResults?.hateSpeechResults['Neither'] || 0, color: 'green', text: 'Positive',  },
//   ];

//   function calculatePercentage(value) {
//     const totalComments = combinedResults?.totalComments || 1; // Avoid division by zero
//     return ((value / totalComments) * 100).toFixed(1) + '%';
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Content Monitoring</Text>
//       <Picker
//         selectedValue={selectedTimePeriod}
//         style={{height: 50, width: 150}}
//         onValueChange={(itemValue, itemIndex) => setSelectedTimePeriod(itemValue)}
//       >
//         <Picker.Item label="All Time" value="overall" />
//         <Picker.Item label="Last Week" value="lastWeek" />
//         <Picker.Item label="Last 2 Weeks" value="last2Weeks" />
//         <Picker.Item label="Last Month" value="lastMonth" />
//       </Picker>
//       <View style={styles.chartContainer}>
//         <PieChart

//           data={pieData}
//           width={screenWidth}
//           height={220}
//           chartConfig={{
//             backgroundColor: '#ffffff',
//             backgroundGradientFrom: '#ffffff',
//             backgroundGradientTo: '#ffffff',
//             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           }}
//           accessor={"value"}
//           backgroundColor={"transparent"}
//           paddingLeft={"15"}
//           center={[screenWidth / 4, 0]}
//           absolute
//           hasLegend={false}
//           doughnut={true}
//           innerRadius={"50%"}
//         />
//         {pieData.map((item, index) => (
//           <View key={index} style={styles.legendItem}>
//             <View style={[styles.dot, { backgroundColor: item.color }]} />
//             <Text style={styles.legendText}>{`${item.text} ${item.percentage}`}</Text>
//           </View>
//         ))}
//       </View>
//       <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.commentButton}>
//         <Text style={styles.commentButtonText}>View Comments</Text>
//       </TouchableOpacity>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(!modalVisible)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalView}>
//             <Text style={styles.commentsTitle}>Comments</Text>
//             <ScrollView style={{ maxHeight: 400 }}>
//               {comments.map((comment, index) => (
//                 <View key={index} style={styles.commentContainer}>
//                   <Text style={styles.commentLabel}>Comment:</Text>
//                   <Text style={styles.commentText}>{comment.comment}</Text>
//                   <Text style={styles.predictionLabel}>Prediction:</Text>
//                   <Text style={styles.predictionText}>{comment.prediction}</Text>
//                 </View>
//               ))}
//             </ScrollView>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#d4e0fc',
//     },
//     header: {
//       fontSize: 26,
//       fontWeight: '700',
//       marginTop: 60,
//       marginBottom: 30,
//       color: 'black',
//       alignSelf: 'center',
//       fontFamily: 'Poppins',
//     },
//     chartContainer: {
//       backgroundColor: '#FFFFFF',
//       alignItems: 'center',
//       marginBottom: 30,
//       borderRadius: 30,
//       margin: 20,
//       padding: 25,
//       shadowColor: "#000",
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4.65,
//       elevation: 8,
//     },
//     legendContainer: {
//       flexDirection: 'column',
//       justifyContent: 'center',
//       marginTop: 15,
//     },
//     legendItem: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginHorizontal: 15,
//     },
//     dot: {
//       width: 12,
//       height: 12,
//       borderRadius: 6,
//       marginRight: 8,
//     },
//     legendText: {
//       fontSize: 15,
//       color: '#34495E',
//       fontFamily: 'Roboto-Regular', // Using Roboto-Regular font
//     },
//     modalContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalView: {
//       backgroundColor: '#FFFFFF',
//       borderRadius: 20,
//       padding: 25,
//       width: '90%',
//       alignItems: 'center',
//       shadowColor: "#000",
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4.65,
//       elevation: 8,
//     },
//     commentsTitle: {
//       fontSize: 22,
//       fontWeight: 'bold',
//       marginBottom: 15,
//       color: '#34495E',
//       fontFamily: 'Poppins',
//     },
//     commentText: {
//       color: 'black',
//       fontSize: 16,
//       fontFamily: 'Poppins',
//     },
//     closeButton: {
//       backgroundColor: '#3868D9',
//       padding: 12,
//       borderRadius: 20,
//       marginTop: 20,
//       paddingHorizontal: 30,
//     },
//     closeButtonText: {
//       color: '#FFFFFF',
//       fontSize: 18,
//       fontWeight: 'bold',
//       fontFamily: 'Poppins',
//     },
//     commentButton: {
//       backgroundColor: '#3868D9',
//       padding: 12,
//       borderRadius: 20,
//       marginTop: 20,
//       alignSelf: 'center',
//       paddingHorizontal: 30,
//     },
//     commentButtonText: {
//       color: '#FFFFFF',
//       fontSize: 18,
//       fontWeight: 'bold',
//       textAlign: 'center',
//       fontFamily: 'Roboto-Bold', // Using Roboto-Bold font
//     },
//     commentContainer: {
//         marginBottom: 10,
//         padding: 10,
//         backgroundColor: '#f7f7f7',
//         borderRadius: 5,
//       },
//       commentLabel: {
//         fontWeight: 'bold',
//         marginBottom: 4,
//       },
//       commentText: {
//         // styling for comment text
//       },
//       predictionLabel: {
//         fontWeight: 'bold',
//         marginTop: 6,
//         marginBottom: 4,
//       },
//       predictionText: {
//         // styling for prediction text
//       },

//   });
// export default ContentMonitoringScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {PieChart, BarChart} from 'react-native-gifted-charts';
import {Picker} from '@react-native-picker/picker';
import {useUser} from './userContext';

const screenWidth = Dimensions.get('window').width;

const ContentMonitoringScreen = ({route}) => {
  const {isfetchUserStatusAndComments, setisfetchUserStatusAndComments} =
    useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('overall');
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setisfetchUserStatusAndComments(selectedTimePeriod);
  }, [selectedTimePeriod]);

  useEffect(() => {
    const results = route.params?.contentcombinedResults || {
      hateSpeechResults: {'Hate Speech Comments': 0, 'Offensive Comments': 0},
      racismResults: {'Racist Comments': 0},
      sexismResults: {'Sexist Comments': 0},
    };

    console.log('Results:', results);
    const combinedDetails = [
      ...(results?.hateSpeechResults?.Details || []),
      ...(results?.racismResults?.Details || []),
      ...(results?.sexismResults?.Details || []),
    ];
    console.log('Combined Details:', combinedDetails);
    setComments(combinedDetails);
  }, [route.params]);

  useEffect(() => {
    console.log('Updated Comments State:', comments);
  }, [comments]);

  const getColorForPrediction = prediction => {
    switch (prediction) {
      case 'Hate Speech':
        return 'pink'; // Color for Hate Speech
      case 'Racist':
        return 'blue'; // Color for Racist
      case 'Sexist':
        return 'yellow'; // Color for Sexist
      case 'Offensive':
        return 'red'; // Color for Offensive
      default:
        return 'grey'; // Default color if no match
    }
  };

  const chartData = [
    {
      value:
        route.params?.contentcombinedResults?.hateSpeechResults[
          'Hate Speech Comments'
        ] || 0,
      label: 'Hate Speech',
      frontColor: '#FF6384',
    },
    {
      value:
        route.params?.contentcombinedResults?.racismResults[
          'Racist Comments'
        ] || 0,
      label: 'Racist',
      frontColor: '#36A2EB',
    },
    {
      value:
        route.params?.contentcombinedResults?.sexismResults[
          'Sexist Comments'
        ] || 0,
      label: 'Sexist',
      frontColor: '#FFCE56',
    },
    {
      value:
        route.params?.contentcombinedResults?.hateSpeechResults[
          'Offensive Comments'
        ] || 0,
      label: 'Offensive',
      frontColor: 'red',
    },
  ].map(item => ({...item, value: parseFloat(item.value)}));

  const pieData = chartData.map(item => ({
    value: item.value,
    color: item.frontColor,
    text: item.label,
    legendFontColor: '#333333',
    legendFontSize: 15,
  }));

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedTimePeriod}
        style={{height: 50, width: 150}}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedTimePeriod(itemValue)
        }>
        <Picker.Item label="All Time" value="overall" />
        <Picker.Item label="Last Week" value="lastWeek" />
        <Picker.Item label="Last 2 Weeks" value="last2Weeks" />
        <Picker.Item label="Last Month" value="lastMonth" />
      </Picker>
      <View style={styles.chartContainer}>
        <PieChart
          donut
          sectionAutoFocus
          textColor="black"
          radius={100}
          textSize={5}
          textBackgroundColor="#ffffff"
          focusOnPress
          innerRadius={50}
          textBackgroundRadius={12}
          data={pieData}
        />
        <View style={styles.legendContainer}>
          {pieData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.dot, {backgroundColor: item.color}]} />
              <Text style={styles.legendText}>{item.text}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={screenWidth - 60}
          height={200}
          barWidth={30}
          noOfSections={5}
          barBorderRadius={5}
          yAxisThickness={0}
          xAxisThickness={0}
          yAxisLabelTexts={['0', '2', '4', '6', '8', '10']}
          showBarTops={false}
          isAnimated
          spacing={30}
          showYAxisIndices={false}
          withHorizontalLabels={false}
        />
      </View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.commentButton}>
        <Text style={styles.commentButtonText}>View Comments</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.commentsTitle}>Comments</Text>
            <ScrollView style={{maxHeight: 400}}>
              {comments.map((comment, index) => (
                <View key={index} style={styles.commentContainer}>
                  <Text style={styles.commentLabel}>Comment:</Text>
                  <Text style={styles.commentText}>{comment.comment}</Text>
                  <Text style={styles.predictionLabel}>Prediction:</Text>
                  <Text
                    style={[
                      styles.predictionText,
                      {color: getColorForPrediction(comment.prediction)},
                    ]}>
                    {comment.prediction}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4e0fc',
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: -10,
    color: 'black',
    alignItems: 'center',
    fontFamily: 'Poppins',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  commentButton: {
    backgroundColor: '#3868D9',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  commentButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#34495E',
  },
  commentText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  closeButton: {
    backgroundColor: '#3868D9',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  commentContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
  },
  commentLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentText: {
    // styling for comment text
  },
  predictionLabel: {
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 4,
  },
  predictionText: {
    // styling for prediction text
  },
});

export default ContentMonitoringScreen;
