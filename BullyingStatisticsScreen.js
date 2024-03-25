import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { PieChart } from "react-native-gifted-charts";

const screenWidth = Dimensions.get('window').width;

const BullyingStatisticsScreen = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Assuming you still want to categorize by "Hate Speech", "Sexism", and "Racism",
  // and have the ability to view comments associated with each.
  const combinedResults = route.params?.combinedResults || {
    hateSpeechResults: { 'Hate Speech Comments': 0 , 'Offensive Comments' :0},
    racismResults: { 'Racist Comments': 0 },
    sexismResults: { 'Sexist Comments': 0 },
  };

  const pieData = [
    { value: combinedResults.hateSpeechResults['Hate Speech Comments'], color: '#eaa361', text: 'Hate Speech', legendFontColor: '#333333', legendFontSize: 15 },
    { value: combinedResults.racismResults['Racist Comments'], color: '#aedded', text: 'Racism', legendFontColor: '#333333', legendFontSize: 15 },
    { value: combinedResults.sexismResults['Sexist Comments'], color: '#2a4f65', text: 'Sexism', legendFontColor: '#333333', legendFontSize: 15 },
    
  ];

  // This is where the userContent from route.params is directly used
  const comments = route.params?.validCommentsAndReplies || [];
  console.log(comments);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bullying And Harassment</Text>
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
        // Removed onPress to select categories as it's not defined in this snippet
        />
        <View style={styles.legendContainer}>
          {pieData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.text}</Text>
            </View>
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
        onRequestClose={() => setModalVisible(!modalVisible)}
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

// The styles object remains unchanged, as provided in your original code


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
    fontFamily: 'Poppins',
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

export default BullyingStatisticsScreen;


