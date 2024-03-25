
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

import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { PieChart } from "react-native-gifted-charts";

const screenWidth = Dimensions.get('window').width;

const ContentMonitoringScreen = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const combinedResults = route.params?.combinedResults || {
    hateSpeechResults: { 'Hate Speech Comments': 0 },
    racismResults: { 'Racist Comments': 0 },
    sexismResults: { 'Sexist Comments': 0 },
  };

  const pieData = [
    { value: combinedResults.hateSpeechResults['Hate Speech Comments'], color: '#eaa361', text: 'Hate Speech', legendFontColor: '#333333', legendFontSize: 15 },
    { value: combinedResults.racismResults['Racist Comments'], color: '#aedded', text: 'Racism', legendFontColor: '#333333', legendFontSize: 15 },
    { value: combinedResults.sexismResults['Sexist Comments'], color: '#2a4f65', text: 'Sexism', legendFontColor: '#333333', legendFontSize: 15 },
  ];


  const comments = route.params?.userContent || // Provide a default empty array if userContent doesn't exist
    console.log(comments);

  // Assuming comments are passed similarly or can be fetched/derived from combinedResults
  // const comments = {
  //   'Hate Speech': [
  //     'First comment related to Hate Speech',
  //     'Second comment related to Hate Speech',
  //   ],
  //   'Racism': [
  //     'First comment related to Racism',
  //     'Second comment related to Racism',
  //   ],
  //   'Sexism': [
  //     'First comment related to Sexism',
  //     'Second comment related to Sexism',
  //   ],
  // };

  //const filteredComments = selectedCategory ? comments[selectedCategory] : Object.values(comments).flat();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Content Monitoring</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={pieData}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor={"value"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[screenWidth / 4, 0]}
          absolute
          hasLegend={false}
          doughnut={true}
          innerRadius={"50%"}
          onPress={(_, index) => setSelectedCategory(pieData[index].text)}
        />
        <View style={styles.legendContainer}>
          {pieData.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedCategory(item.text)}>
              <View style={[styles.legendItem, { opacity: selectedCategory === item.text ? 1 : 0.5 }]}>
                <View style={[styles.dot, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>{item.text}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.commentButton}>
        <Text style={styles.commentButtonText}>View Comments</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setSelectedCategory(null);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.commentsTitle}>Comments</Text>
            <ScrollView style={{ maxHeight: 400 }}>
              {comments.map((comment, index) => (
                <View key={index} style={styles.comment}>
                  <Text style={styles.commentText}>{index + 1}. {comment}</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
    </View>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4e0fc',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginTop: 60,
    marginBottom: 30,
    color: 'black',
    alignSelf: 'center',
    fontFamily: 'Poppins',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 30,
    margin: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  legendContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 15,
    color: '#34495E',
    fontFamily: 'Roboto-Regular', // Using Roboto-Regular font
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
    padding: 25,
    width: '90%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  commentsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#34495E',
    fontFamily: 'Poppins',
  },
  commentText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  closeButton: {
    backgroundColor: '#3868D9',
    padding: 12,
    borderRadius: 20,
    marginTop: 20,
    paddingHorizontal: 30,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins', // Using Roboto-Bold font
  },
  commentButton: {
    backgroundColor: '#3868D9',
    padding: 12,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    paddingHorizontal: 30,
  },
  commentButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold', // Using Roboto-Bold font
  },
});

export default ContentMonitoringScreen;