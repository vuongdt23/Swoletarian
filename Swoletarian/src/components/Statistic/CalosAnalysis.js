import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';

import {
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
  Tooltip,
} from 'react-native-responsive-linechart';

import {getCaloriesRecapByCurrentUser, getWorkoutRecapByCurrentUser} from '../../Firebase/reportAPI';

const windowWidth = Dimensions.get ('window').width * 2;
const windowHeight = Dimensions.get ('window').height;
class CalosAnalysis extends React.Component {
  constructor (props) {
    super (props);
  }
  state = {
    caloriesRecaps: [],
    workoutRecaps:[],
    labels: [],
    data: [],
  };
  componentDidMount () {
    let tempArray = [];
    let wrcArr =[];
    getCaloriesRecapByCurrentUser ()
      .then (res => {
        let a = 5;
        res.forEach (doc => {
          let tempObj = {y: doc.data ().recapCalories};
          a+=1;
          tempObj.x = a ;
          tempArray.push (tempObj);
        });
        console.log (tempArray);

        this.setState ({caloriesRecaps: tempArray});
      })
      .catch (err => console.log (err));
      getWorkoutRecapByCurrentUser ()
      .then (res => {
        let a = 5;
        res.forEach (doc => {
          let tempObj = {y: doc.data ().workoutCalories};
          a+=1;
          tempObj.x = a ;
          wrcArr.push (tempObj);
        });
        console.log (wrcArr);

        this.setState ({workoutRecaps: wrcArr});
      })
      .catch (err => console.log (err));
  }

  render () {
    return (
      <View style={styles.container}>
        <Chart
          style={{height: windowHeight / 2, width: windowWidth / 3}}
          data={
            this.state.caloriesRecaps.length > 0
              ? this.state.caloriesRecaps
              : [{x: 1, y: 2}, {x: 1, y: 3}, {x: 4, y: 5}]
          }
          padding={{left: 40, bottom: 20, right: 20, top: 20}}
          xDomain={{min: 0, max: 30}}
          yDomain={{min: 0, max: 2000}}
        >
          <VerticalAxis
            tickCount={10}
            theme={{labels: {formatter: v => v.toFixed (0)}}}
          />
          <HorizontalAxis tickCount={5} />

          <Area
            theme={{
              gradient: {
                from: {color: '#44bd32'},
                to: {color: '#44bd32', opacity: 0.2},
              },
            }}

          
          />

          <Line  theme={{
              gradient: {
                from: {color: '#44bd32'},
                to: {color: '#44bd32', opacity: 0.2},
              },
            }}>

          </Line>
        </Chart>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFDD93',
  },
});

export default CalosAnalysis;
