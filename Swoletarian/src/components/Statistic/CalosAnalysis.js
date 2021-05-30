import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {getCaloriesRecapByCurrentUser} from '../../Firebase/reportAPI';
class CalosAnalysis extends React.Component {
  constructor (props) {
    super (props);
  }
  state={
    caloriesRecaps:[],
    labels:[],
    data:[],
  }
  componentDidMount () {
    let tempArray=[];
    getCaloriesRecapByCurrentUser ()
      .then (res => {
        res.forEach (doc => {
         
         tempArray.push(doc.data());
        });
        this.setState({caloriesRecaps: tempArray});
        console.log(tempArray);
      })
      .then (err => console.log (err));
  }

  render () {
    return (
      <View>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [
                  Math.random () * 100,
                  Math.random () * 100,
                  Math.random () * 100,
                  Math.random () * 100,
                  Math.random () * 100,
                  Math.random () * 100,
                ],
              },
            ],
          }}
          width={400} // from react-native
          height={400}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#58DADA',
            backgroundGradientFrom: '#58DADA',
            backgroundGradientTo: '#58DADA',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 30,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#58DADA',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDD93',
  },
});

export default CalosAnalysis;
