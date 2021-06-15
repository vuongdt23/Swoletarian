import React from 'react';
import {View} from 'react-native';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions
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

import {getStatsbyCurentUser} from '../../Firebase/reportAPI';
const windowWidth = Dimensions.get ('window').width * 2;
const windowHeight = Dimensions.get ('window').height;
class BMI extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      currentBMI: 0,
      currentWeight: 63,
      currentHeight: 170,
      BMIColor: 'black',
      BMIs: [],
      BMIs30days: [],
      loading: true,
      dropdownValue: '30 ngày',
    };
  }
  componentDidMount = () => {
    let BMIArr = [];
    let BMI30Arr = [];
    const days30Prior =
      new Date (Date.now () - 30 * 24 * 60 * 60 * 1000).getTime () / 86400000; //this is to get the number of dates since epoch from 30 days ago since today;
    getStatsbyCurentUser ()
      .then (res => {
        res.forEach (doc => {
          let statObj = {
            y: doc.data ().userWeight /
              (doc.data ().userHeight / 100 * doc.data ().userHeight / 100),
          };

          statObj.x = Math.floor (
            doc.data ().userStatsDate.toDate ().getTime () / 86400000 //this is to get the number of dates since epoch
          );
          BMIArr.push (statObj);
        });
       // console.log ('All BMIs', BMIArr);

        this.setState ({BMIs: BMIArr});

        BMIArr.forEach (BMI => {
          if (BMI.x >= days30Prior) BMI30Arr.push (BMI);
        });

        this.setState ({BMIs30days: BMI30Arr});
       // console.log ('30 days recaps', BMI30Arr);
      })
      .catch (err => console.log (err));
    this.setState ({loading: false});

    this.setState ({
      currentBMI: parseFloat (
        this.state.currentWeight /
          this.state.currentHeight /
          this.state.currentHeight *
          10000
      ).toPrecision (4),
    });
    if (this.state.currentBMI < 18.5) this.setState ({BMIColor: '#00FFFF'});
    else if (this.state.currentBMI >= 18.5 && currentBMI <= 24.9)
      this.setState ({BMIColor: '#00FF29'});
    else if (this.state.currentBMI > 24.9 && currentBMI <= 29.9)
      this.setState ({BMIColor: '#FFDF3A'});
    else this.setState ({BMIColor: '#FF3A3A'});
  };

  dropDownSelectHandler = (index, option) => {
    this.setState ({dropdownValue: option});
   // console.log (option);
  };
  render () {
    //console.log (this.state.currentBMI.toString ());
    //  console.log (this.state.BMIColor);
    //  console.log (3);
    if (this.state.loading) return <View />;
    else {
      let BMIData = [...this.state.BMIs30days];
      if (this.state.dropdownValue === 'Tất cả thời gian') {
        BMIData = [...this.state.BMIs];
      }
      return (
        <View style={styles.container}>
          <View>
            <ModalDropdown
              defaultValue={'30 ngày'}
              animated
              onSelect={(index, option) =>
                this.dropDownSelectHandler (index, option)}
              options={['30 ngày', 'Tất cả thời gian']}
            />
          </View>
          <Chart
            style={{height: windowHeight * 0.8, width: windowWidth / 2.5}}
            data={
              BMIData.length > 0
                ? BMIData
                : [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}]
            }
            padding={{left: 40, bottom: 20, right: 20, top: 20}}
            xDomain={{min: 18500, max: 19000}}
            yDomain={{min: 0, max: 50}}
          >
            <VerticalAxis
              tickCount={10}
              theme={{labels: {formatter: v => v.toFixed (0)}}}
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

          </Chart>

        </View>
      );
      // <SafeAreaView style={styles.container}>
      //   <Text style={styles.headerTitle}>BMI</Text>
      //   <ScrollView contentContainerStyle={styles.container}>
      //     <View style={styles.BMIDetailContainer}>
      //       <Text
      //         style={{
      //           fontSize: 80,
      //           fontFamily: 'Roboto-Bold',
      //           color: this.state.BMIColor.toString (),
      //         }}
      //       >
      //         {this.state.currentBMI}
      //       </Text>
      //       <View style={styles.BMIStats}>
      //         <Text style={styles.BMIStatsContent}>
      //           {this.state.currentHeight} cm
      //         </Text>
      //         <Text style={styles.BMIStatsContent}>
      //           {this.state.currentWeight} kg
      //         </Text>
      //       </View>
      //     </View>
      //   </ScrollView>
      // </SafeAreaView>
    }
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
  },
  headerTitle: {
    fontSize: 45,
    color: '#000000',
    fontFamily: 'Roboto-Bold',
    marginVertical: '2%',
  },
  BMIDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    height: '20%',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    height: '30%',
    padding: '5%',
    marginVertical: '5%',
  },
  BMIStats: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '10%',
  },
  BMIValue: {
    fontSize: 80,
    fontFamily: 'Roboto-Bold',
  },
  BMIStatsContent: {
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
    color: '#A4FFFF',
    backgroundColor: '#005E7C',
    borderRadius: 10,
    margin: 5,
    padding: 5,
  },
});

export default BMI;
