import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { PieChart } from "react-native-gifted-charts";

const screenWidth = Dimensions.get('window').width;

const FbContentMonitoringScreen = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Safely access the analysisResults with defaults
  const analysisResults = route.params?.analysisResults || {
    hateSpeechResults: { 'Hate Speech Comments': 0 },
    racismResults: { 'Racist Comments': 0 },
    sexismResults: { 'Sexist Comments': 0 },
  };

  console.log("Kya haal ha", analysisResults)

  const pieData = [
    {
      value: analysisResults?.hateSpeech?.['Hate Speech Comments'] || 0,
      color: '#3868D9',
      text: 'Hate Speech',
      legendFontColor: 'black',
      legendFontSize: 15
    },
    {
      value: analysisResults?.racism?.['Racist Comments'] || 0,
      color: '#049598',
      text: 'Racism',
      legendFontColor: 'black',
      legendFontSize: 15
    },
    {
      value: analysisResults?.sexism?.['Sexist Comments'] || 0,
      color: '#d4e0fc',
      text: 'Sexism',
      legendFontColor: 'black',
      legendFontSize: 20
    },
    {
      value: analysisResults?.sexism?.['Offensive Comments'] || 0,
      color: '#f76649',
      text: 'Offensive',
      legendFontColor: 'black',
      legendFontSize: 15
    },
  ];


  console.log('Pie Data:', pieData);

  const comments = route.params?.messages || {}; // Provide a default empty array if userContent doesn't exist
  console.log(comments);

  // const comments = route.params?.userContent || // Provide a default empty array if userContent doesn't exist
  // console.log(comments);

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
    marginTop: 30,
    marginBottom: 20,
    color: '#34495E',
    alignSelf: 'center',
    fontFamily: 'Poppins', // Using Roboto-Bold font
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 30,
    margin: 20,
    padding: 20,
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
    marginTop: 10,
    padding: 20,
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
    fontFamily: 'Roboto-Bold', // Using Roboto-Bold font
  },
  commentText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Roboto-Regular', // Using Roboto-Regular font
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
    fontFamily: 'Roboto-Bold', // Using Roboto-Bold font
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

export default FbContentMonitoringScreen;