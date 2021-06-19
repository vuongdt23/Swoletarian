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
import ModalDropdown from 'react-native-modal-dropdown';

import {
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
  Tooltip,
} from 'react-native-responsive-linechart';

import {
  getCaloriesGainRecapByCurrentUser,
  getCaloriesBurnRecapByCurrentUser,
} from '../../Firebase/reportAPI';
const windowWidth = Dimensions.get('window').width * 2;
const windowHeight = Dimensions.get('window').height;
class CalosAnalysis extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    caloriesRecaps: [],
    workoutRecaps: [],
    caloriesRecaps30days: [],
    workOutRecaps30days: [],
    dropdownValue: '30 ngày',

    loading: true,
  };
  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    const days30Prior =
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getTime() / 86400000; //this is to get the number of dates since epoch from 30 days ago since today;
    let crcArr = [];
    let wrcArr = [];
    let crc30Arr = [];
    let wrc30Arr = [];
    getCaloriesGainRecapByCurrentUser()
      .then(res => {
        res.forEach(doc => {
          let crcObj = {y: doc.data().gainCalories};

          crcObj.x = Math.floor(
            doc.data().gainRecapDate.toDate().getTime() / 86400000, //this is to get the number of dates since epoch
          );
          crcArr.push(crcObj);
        });
        console.log('All calories Recaps', crcArr);

        this.setState({caloriesRecaps: crcArr});

        crcArr.forEach(caloriesRecap => {
          if (caloriesRecap.x >= days30Prior) crc30Arr.push(caloriesRecap);
        });

        this.setState({caloriesRecaps30days: crc30Arr});
        console.log('30 days recaps', crc30Arr);
      })
      .catch(err => console.log(err));
    getCaloriesBurnRecapByCurrentUser()
      .then(res => {
        res.forEach(doc => {
          let wrcObj = {y: doc.data().burnByTDEE + doc.data().burnByExercises};

          wrcObj.x = Math.floor(
            doc.data().burnRecapDate.toDate().getTime() / 86400000, //this is to get the number of dates since epoch
          );
          wrcArr.push(wrcObj);
        });
        console.log('All workout Recaps', wrcArr);

        this.setState({workoutRecaps: wrcArr});

        wrcArr.forEach(workoutRecap => {
          if (workoutRecap.x >= days30Prior) wrc30Arr.push(workoutRecap);
        });
        console.log('30 days recaps', wrc30Arr);
        this.setState({workOutRecaps30days: wrc30Arr});
      })
      .catch(err => console.log(err));

    this.setState({loading: false});
  };
  dropDownSelectHandler = (index, option) => {
    this.setState({dropdownValue: option});
    console.log(option);
  };

  render() {
    if (this.state.loading) {
      return <View />;
    } else {
      let workoutData = [...this.state.workOutRecaps30days];

      let caloriesData = [...this.state.caloriesRecaps30days];
      if (this.state.dropdownValue === 'Tất cả thời gian') {
        caloriesData = [...this.state.caloriesRecaps];
        workoutData = [...this.state.workoutRecaps];
      }

      console.log('workout Data', workoutData);
      console.log('calories Data', caloriesData);
      return (
        <View style={styles.container}>
          <View>
            <ModalDropdown
              defaultValue={'30 ngày'}
              animated
              onSelect={(index, option) =>
                this.dropDownSelectHandler(index, option)
              }
              options={['30 ngày', 'Tất cả thời gian']}
            />
          </View>
          <Chart
            style={{
              height: windowHeight * 0.8,
              width: windowWidth / 2.5,
              backgroundColor: '#1CA2BB',
            }}
            data={
              caloriesData.length > 0
                ? caloriesData
                : [
                    {x: 1, y: 2},
                    {x: 3, y: 4},
                    {x: 5, y: 6},
                  ]
            }
            padding={{left: 40, bottom: 20, right: 20, top: 20}}
            xDomain={{min: 18700, max: 19000}}
            yDomain={{min: 0, max: 5000}}>
            <VerticalAxis
              tickCount={10}
              theme={{labels: {formatter: v => v.toFixed(0)}}}
            />
            <HorizontalAxis tickCount={0} />
            <Line
              tooltipComponent={<Tooltip />}
              theme={{
                opacity: '0.3',
                stroke: {color: '#44bd32', width: 3},
                scatter: {
                  default: {width: 8, height: 8, rx: 4, color: '#44ad32'},
                  selected: {color: 'red'},
                },
              }}
            />
            <Area
              theme={{
                gradient: {
                  from: {color: '#44bd32'},
                  to: {color: '#83d475', opacity: 0.2},
                },
              }}
            />

            <Line
              smoothing={'bezier'}
              data={
                workoutData.length > 0
                  ? workoutData
                  : [
                      {x: 1, y: 2},
                      {x: 3, y: 4},
                      {x: 5, y: 6},
                    ]
              }
              tooltipComponent={<Tooltip />}
              theme={{
                opacity: '0.3',

                stroke: {color: '#F07470', width: 3},
                scatter: {
                  default: {width: 8, height: 8, rx: 4, color: '#000000'},
                  selected: {color: 'red'},
                },
              }}
            />
            <Area
              smoothing={'bezier'}
              data={
                workoutData.length > 0
                  ? workoutData
                  : [
                      {x: 1, y: 2},
                      {x: 3, y: 4},
                      {x: 5, y: 6},
                    ]
              }
              theme={{
                gradient: {
                  from: {color: '#DC1C13'},
                  to: {color: '#F6BDC0', opacity: 0.2},
                },
              }}
            />
          </Chart>

          <Text>See your progress here</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
  },
});

export default CalosAnalysis;
