import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {PieChart, BarChart} from 'react-native-gifted-charts';
import {Picker} from '@react-native-picker/picker';
import {useUser} from './userContext';

const screenWidth = Dimensions.get('window').width;

const FollowingListVisualizations = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const personalityResults =
      route.params?.combinedpersonalityResults?.personalityResults;
    if (personalityResults) {
      let combinedComments = [];
      if (personalityResults.Details) {
        for (const key in personalityResults.Details) {
          combinedComments.push({
            comment: key,
            prediction: personalityResults.Details[key],
          });
        }
      }
      setComments(combinedComments);
    }
  }, [route.params]);

  useEffect(() => {
    console.log('Updated Comments State:', comments);
  }, [comments]);

  const formatPercentage = value => {
    return `${(parseFloat(value) * 100).toFixed(2)}%`;
  };

  const PredictionBox = ({predictions}) => {
    let parsedPredictions = predictions;
    // Check if predictions is a string and parse it if necessary
    if (typeof predictions === 'string') {
      try {
        parsedPredictions = JSON.parse(predictions);
      } catch (error) {
        console.error('Error parsing predictions:', error);
        return <Text style={styles.errorText}>Failed to load predictions</Text>;
      }
    }

    // Function to determine color based on the trait key
    const getColorForKey = key => {
      switch (key) {
        case 'Agreeableness':
          return '#f6d365'; // yellow gradient
        case 'Conscientiousness':
          return '#fda085'; // orange gradient
        case 'Extraversion':
          return '#84fab0'; // green gradient
        case 'Neuroticism':
          return '#8fd3f4'; // blue gradient
        case 'Openness':
          return '#a18cd1'; // purple gradient
        default:
          return '#d3d3d3'; // default gray
      }
    };

    return (
      <View style={styles.predictionContainer}>
        {Object.entries(parsedPredictions).map(([key, value]) => (
          <View
            key={key}
            style={[
              styles.predictionBox,
              {backgroundColor: getColorForKey(key)},
            ]}>
            <Text style={styles.predictionKey}>{key}:</Text>
            <Text style={styles.predictionValue}>
              {formatPercentage(value)}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const combinedpersonalityResults = route.params
    ?.combinedpersonalityResults || {
    personalityResults: {
      Agreeableness: 0,
      Conscientiousness: 0,
      Extraversion: 0,
      Neuroticism: 0,
      Openness: 0,
      Details: {},
    },
  };

  // const totalComments =
  //   combinedResults.hateSpeechResults['Hate Speech Comments'] +
  //   combinedResults.racismResults['Racist Comments'] +
  //   combinedResults.sexismResults['Sexist Comments'];

  const chartData = [
    {
      value: combinedpersonalityResults?.personalityResults['Agreeableness'],
      label: 'Agreeableness',
      frontColor: 'green',
    },
    {
      value:
        combinedpersonalityResults?.personalityResults['Conscientiousness'],
      label: 'Conscientiousness',
      frontColor: 'red',
    },
    {
      value: combinedpersonalityResults?.personalityResults['Extraversion'],
      label: 'Extraversion',
      frontColor: '#FF6384',
    },
    {
      value: combinedpersonalityResults?.personalityResults['Neuroticism'],
      label: 'Neuroticism',
      frontColor: '#FFCE56',
    },
    {
      value: combinedpersonalityResults?.personalityResults['Openness'],
      label: 'Openness',
      frontColor: '#36A2EB',
    },
  ].map(item => ({...item, value: parseFloat(item.value)}));

  const pieData = chartData.map(item => ({
    value: item.value,
    color: item.frontColor,
    text: item.label,
    legendFontColor: '#333333',
    legendFontSize: 15,
  }));

  //const comments = route.params?.validCommentsAndReplies || [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>.</Text>
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
          height={250}
          barWidth={35}
          noOfSections={5}
          barBorderRadius={5}
          yAxisThickness={0}
          xAxisThickness={0}
          yAxisLabelTexts={['0', '5', '10', '15', '20', '25']}
          showBarTops={false}
          spacing={20}
          showYAxisIndices={false}
          withHorizontalLabels={false}
          xAxisLabelTextStyle={{
            rotation: 45, // Rotate labels by 45 degrees
            textAlign: 'center',
            color: '#000',
            fontSize: 7,
          }}
          isAnimated
        />
      </View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.commentButton}>
        <Text style={styles.commentButtonText}>View Details</Text>
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
                  <PredictionBox predictions={comment.prediction} />
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
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
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
    fontSize: 6,
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
  predictionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  predictionBox: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    margin: 2,
    borderRadius: 4,
    minWidth: 100,
  },
  predictionKey: {
    fontWeight: 'bold',
    color: '#333',
  },
  predictionValue: {
    color: '#666',
  },
});

export default FollowingListVisualizations;
