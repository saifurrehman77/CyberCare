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

const UserSentimentsScreen = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log('Route Params:', JSON.stringify(route.params, null, 2)); // Detailed logging of route.params

    // Access the nested details array
    const details =
      route.params?.combinedsentimentResults?.sentimentResults?.details;

    console.log('Details:', details); // Log the details to ensure they are being accessed

    if (details && Array.isArray(details)) {
      // Check if details is indeed an array
      const formattedComments = details.map(detail => ({
        comment: detail.comment,
        probabilities: detail.probabilities,
      }));

      console.log('Formatted Comments:', formattedComments); // Log formatted comments to verify structure
      setComments(formattedComments);
    } else {
      console.error('Details are missing or not an array');
    }
  }, [route.params]);

  const formatPercentage = value => {
    return `${(parseFloat(value) * 100).toFixed(2)}%`;
  };

  const getColorForKey = key => {
    switch (key) {
      case 'neutral':
        return '#f6d365'; // yellow gradient
      case 'negative':
        return '#fda085'; // orange gradient
      case 'positive':
        return '#84fab0'; // green gradientple gradient
      default:
        return '#d3d3d3'; // default gray
    }
  };

  const PredictionBox = ({predictions}) => {
    // Define colors for the personality traits

    // return (
    //   <View style={styles.predictionContainer}>
    //     {Object.entries(predictions).map(([key, value]) => (
    //       <View
    //         key={key}
    //         style={[
    //           styles.traitBox,
    //           {backgroundColor: colors[key.toLowerCase()]},
    //         ]}>
    //         <Text style={styles.traitLabel}>
    //           {key.charAt(0).toUpperCase() + key.slice(1)}
    //         </Text>
    //         <Text style={styles.traitValue}>{`${(value * 100).toFixed(
    //           2,
    //         )}%`}</Text>
    //       </View>
    //     ))}
    //   </View>
    // );

    return (
      <View style={styles.predictionContainer}>
        {Object.entries(predictions).map(([key, value]) => (
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

  const combinedsentimentResults = route.params?.combinedsentimentResults || {
    sentimentResults: {
      Positive: 0,
      Negative: 0,
      Neutral: 0,
      Details: {},
    },
  };

  // const totalComments =
  //   combinedResults.hateSpeechResults['Hate Speech Comments'] +
  //   combinedResults.racismResults['Racist Comments'] +
  //   combinedResults.sexismResults['Sexist Comments'];

  const chartData = [
    {
      value: combinedsentimentResults?.sentimentResults['positive'],
      label: 'Positive',
      frontColor: 'green',
    },
    {
      value: combinedsentimentResults?.sentimentResults['negative'],
      label: 'Negative',
      frontColor: 'red',
    },
    {
      value: combinedsentimentResults?.sentimentResults['neutral'],
      label: 'Neutral',
      frontColor: 'pink',
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
          spacing={40}
          showYAxisIndices={false}
          withHorizontalLabels={false}
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
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.commentsTitle}>Comments</Text>
            <ScrollView style={{maxHeight: 400}}>
              {comments.map((comment, index) => (
                <View key={index} style={styles.commentContainer}>
                  <Text style={styles.commentLabel}>Comment:</Text>
                  <Text style={styles.commentText}>{comment.comment}</Text>
                  <Text style={styles.predictionLabel}>Prediction:</Text>
                  <PredictionBox predictions={comment.probabilities} />
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
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
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    justifyContent: 'space-between',
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
    fontSize: 15,
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
  traitBox: {
    flex: 1,
    padding: 8,
    margin: 4,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  traitLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  traitValue: {
    fontSize: 14,
    color: '#ffffff',
  },
  predictionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  predictionBox: {
    padding: 8,
    borderRadius: 4,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  predictionKey: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  predictionValue: {
    color: '#666',
  },
});

export default UserSentimentsScreen;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Dimensions,
//   StyleSheet,
//   Text,
//   Modal,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import {PieChart, BarChart} from 'react-native-gifted-charts';

// const screenWidth = Dimensions.get('window').width;

// const UserSentimentsScreen = ({route}) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     const details =
//       route.params?.combinedsentimentResults?.sentimentResults?.details;
//     if (details && Array.isArray(details)) {
//       setComments(
//         details.map(detail => ({
//           comment: detail.comment,
//           probabilities: detail.probabilities,
//         })),
//       );
//     }
//   }, [route.params]);

//   const formatPercentage = value => `${(parseFloat(value) * 100).toFixed(2)}%`;

//   const PredictionBox = ({predictions}) => {
//     return (
//       <View style={styles.predictionContainer}>
//         {Object.entries(predictions).map(([key, value]) => (
//           <View
//             key={key}
//             style={[
//               styles.predictionBox,
//               {backgroundColor: getColorForKey(key)},
//             ]}>
//             <Text style={styles.predictionKey}>{key}:</Text>
//             <Text style={styles.predictionValue}>
//               {formatPercentage(value)}
//             </Text>
//           </View>
//         ))}
//       </View>
//     );
//   };

//   const getColorForKey = key => {
//     switch (key) {
//       case 'positive':
//         return '#4CAF50'; // Green
//       case 'neutral':
//         return '#FFEB3B'; // Yellow
//       case 'negative':
//         return '#F44336'; // Red
//       default:
//         return '#d3d3d3'; // Default gray
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>User Sentiments</Text>
//       <TouchableOpacity
//         onPress={() => setModalVisible(true)}
//         style={styles.commentButton}>
//         <Text style={styles.commentButtonText}>View Details</Text>
//       </TouchableOpacity>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalView}>
//             <Text style={styles.commentsTitle}>Comments</Text>
//             <ScrollView style={styles.scrollView}>
//               {comments.map((comment, index) => (
//                 <View key={index} style={styles.commentContainer}>
//                   <Text style={styles.commentText}>{comment.comment}</Text>
//                   <PredictionBox predictions={comment.probabilities} />
//                 </View>
//               ))}
//             </ScrollView>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setModalVisible(false)}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#d4e0fc',
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginTop: 30,
//     marginBottom: 20,
//     color: 'black',
//     textAlign: 'center',
//   },
//   commentButton: {
//     backgroundColor: '#3868D9',
//     padding: 10,
//     borderRadius: 15,
//     alignSelf: 'center',
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   commentButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalView: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 20,
//     width: '90%',
//     maxHeight: '80%',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//     elevation: 8,
//     justifyContent: 'space-between',
//   },
//   commentsTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   scrollView: {
//     width: '100%',
//   },
//   commentContainer: {
//     marginBottom: 10,
//     padding: 10,
//     backgroundColor: '#f7f7f7',
//     borderRadius: 5,
//   },
//   commentText: {
//     color: 'black',
//     fontSize: 14,
//     fontFamily: 'Poppins',
//   },
//   closeButton: {
//     backgroundColor: '#3868D9',
//     borderRadius: 20,
//     padding: 10,
//     width: '50%',
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   predictionContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 10,
//   },
//   predictionBox: {
//     padding: 8,
//     borderRadius: 4,
//     minWidth: 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   predictionKey: {
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   predictionValue: {
//     color: '#666',
//   },
// });

// export default UserSentimentsScreen;
