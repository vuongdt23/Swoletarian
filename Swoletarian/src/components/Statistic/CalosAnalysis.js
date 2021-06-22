import React, {useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
  Tooltip,
} from 'react-native-responsive-linechart';

import {
  getUserBurnRecapsbyRange,
  getUserGainRecapsbyRange,
} from '../../Firebase/reportAPI';
const windowWidth = Dimensions.get('window').width * 2;
const windowHeight = Dimensions.get('window').height;
class CalosAnalysis extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    dropdownSelect: '',
    burnRecaps30days: [],
    burnRecaps7days: [],
    gainRecaps30days: [],
    gainRecaps7days: [],
    dateStart30: 0,
    dateFinish: 0,
    dateStart7: 0,
    isLoading: true,
    TDEEInfo:
      'TDEE (là viết tắt của Total Daily Energy Expenditure) là chỉ số calo cần thiết cho cơ thể trong 1 ngày bao gồm tất cả hoạt động ăn chơi ngủ nghỉ mà bạn có trong ngày. TDEE được biểu hiện bằng đơn vị Calories, nó cũng chính là lượng calo (mức năng lượng) giúp bạn duy trì cân nặng hiện tại.',
    userInfo: {
      userName: 'Phan Duy Duc',
      userHeight: 170,
      userWeight: 66,
      userSex: 'male',
      userAge: 21,
      userType: 'intermediate',
      ownerID: '',
    },
  };
  componentDidMount() {
    this.loadData();
  }
  calculateTDEE = () => {
    const userInfo = this.state.userInfo;
    let Z = 0;
    switch (userInfo.userType) {
      case 'beginner':
        Z = 1.55;
        break;
      case 'intermediate':
        Z = 1.725;
        break;
      case 'advanced':
        Z = 1.9;
        break;
    }
    let BMR = 0;
    if (userInfo.userSex === 'male') {
      BMR =
        10 * userInfo.userWeight +
        6.25 * userInfo.userHeight -
        5 * userInfo.userAge +
        5;
    } else {
      BMR =
        10 * userInfo.userWeight +
        6.25 * userInfo.userHeight -
        5 * userInfo.userAge -
        161;
    }
    console.log('BMR', BMR, 'Z', Z);
    return Math.round(BMR * Z);
  };
  loadData = () => {
    let today = new Date();
    let oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    oneWeekAgo.setHours(0, 0, 0, 0);

    let OneMonthAgo = new Date();
    OneMonthAgo.setDate(OneMonthAgo.getDate() - 30);
    OneMonthAgo.setHours(0, 0, 0, 0);

    let yRangeStartMonth = Math.floor(OneMonthAgo.getTime() / 86400000);
    let yRangeStartWeek = Math.floor(oneWeekAgo.getTime() / 86400000);
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    let yRangeFinish = Math.floor(tomorrow.getTime() / 86400000);

    this.setState({
      dateStart30: yRangeStartMonth,
      dateStart7: yRangeStartWeek,
      dateFinish: yRangeFinish,
    });
    //console.log('range', yRangeStart, yRangeFinish);
    // console.log('tomorrrow', tomorrow);
    let burn30Arr = [];
    let burn7Arr = [];
    let gain30Arr = [];
    let gain7Arr = [];

    let counter = 0;
    getUserBurnRecapsbyRange(oneWeekAgo, today)
      .then(res => {
        res.forEach(doc => {
          let burnOBj = {x: 0, y: 0};
          burnOBj.x = Math.floor(doc.data().burnRecapDate.seconds / 86400);
          burnOBj.y = doc.data().burnByTDEE + doc.data().burnByExercises;
          console.log(burnOBj);
          burn7Arr.push(burnOBj);
        });
        this.setState({burnRecaps7days: burn7Arr}, () => {
          counter++;
          if (counter === 4) {
            this.setState({isLoading: false});
          }
        });
      })
      .catch(err => {
        console.log(err);
      });

    getUserBurnRecapsbyRange(OneMonthAgo, today)
      .then(res => {
        res.forEach(doc => {
          let burnOBj = {x: 0, y: 0};
          burnOBj.x = Math.floor(doc.data().burnRecapDate.seconds / 86400);
          burnOBj.y = doc.data().burnByTDEE + doc.data().burnByExercises;
          console.log(burnOBj);
          burn30Arr.push(burnOBj);
        });
        this.setState({burnRecaps30days: burn30Arr}, () => {
          counter++;
          if (counter === 4) {
            this.setState({isLoading: false});
          }
        });
      })
      .catch(err => {
        console.log(err);
      });

    getUserGainRecapsbyRange(oneWeekAgo, today)
      .then(res => {
        res.forEach(doc => {
          let gainObj = {x: 0, y: 0};
          gainObj.x = Math.floor(doc.data().gainRecapDate.seconds / 86400);
          gainObj.y = doc.data().gainCalories;
          console.log(gainObj);
          gain7Arr.push(gainObj);
        });
        this.setState({gainRecaps7days: gain7Arr}, () => {
          counter++;
          if (counter === 4) {
            this.setState({isLoading: false});
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
    getUserGainRecapsbyRange(OneMonthAgo, today)
      .then(res => {
        res.forEach(doc => {
          let gainObj = {x: 0, y: 0};
          gainObj.x = Math.floor(doc.data().gainRecapDate.seconds / 86400);
          gainObj.y = doc.data().gainCalories;
          console.log(gainObj);
          gain30Arr.push(gainObj);
        });
        this.setState({gainRecaps30days: gain30Arr}, () => {
          counter++;
          if (counter === 4) {
            this.setState({isLoading: false});
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#1CA2BB" />
        </View>
      );
    } else {
      let dataGain = [];
      let dataBurn = [];
      let dateStart = 0;

      if (this.state.dropdownSelect === '7day') {
        dataGain = [...this.state.gainRecaps7days];
        dataBurn = [...this.state.burnRecaps7days];
        dateStart = this.state.dateStart7;
      } else {
        dataGain = [...this.state.gainRecaps30days];
        dataBurn = [...this.state.burnRecaps30days];
        dateStart = this.state.dateStart30;
      }
      return (
        <View style={styles.container}>
          <Text style={styles.headerTitle}>TDEE</Text>
          <View style={styles.TDEEInfoContainer}>
            <Text style={styles.TDEEInfoTitle}>{this.state.TDEEInfo}</Text>
            <View style={styles.userInfoTDEEContainer}>
              <Text style={styles.title}>TDEE của bạn</Text>
              <Text style={styles.userTDEE}>{this.calculateTDEE()}</Text>
            </View>
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Biểu đồ calo in-out của bạn</Text>
            <DropDown
              callDropDownValue={value => {
                this.setState({dropdownSelect: value});
              }}></DropDown>
            <Chart
              style={{height: '80%', width: '90%'}}
              data={
                this.state.burnRecaps30days.length > 0
                  ? dataBurn
                  : [
                      {x: -2, y: 15},
                      {x: -1, y: 10},
                      {x: 0, y: 12},
                      {x: 1, y: 7},
                      {x: 2, y: 6},
                      {x: 3, y: 8},
                      {x: 4, y: 10},
                      {x: 5, y: 8},
                      {x: 6, y: 12},
                      {x: 7, y: 14},
                      {x: 8, y: 12},
                      {x: 9, y: 13.5},
                      {x: 10, y: 18},
                    ]
              }
              padding={{left: 40, bottom: 20, right: 20, top: 20}}
              xDomain={{min: dateStart, max: this.state.dateFinish}}
              yDomain={{min: 0, max: 5000}}>
              <VerticalAxis
                tickCount={11}
                theme={{labels: {formatter: v => v.toFixed(0)}}}
              />
              <HorizontalAxis
                theme={{
                  labels: {
                    formatter: date =>
                      new Date(date * 86400000).toLocaleDateString(),
                  },
                }}
                tickCount={5}
              />

              <Line
                theme={{
                  stroke: {color: '#ffa502', width: 5},
                  scatter: {
                    default: {width: 4, height: 4, rx: 2, color: '#ffa502'},
                  },
                }}
              />

              <Line
                data={
                  this.state.gainRecaps30days.length > 0
                    ? dataGain
                    : [
                        {x: -2, y: 15},
                        {x: -1, y: 10},
                        {x: 0, y: 12},
                        {x: 1, y: 7},
                        {x: 2, y: 6},
                        {x: 3, y: 8},
                        {x: 4, y: 10},
                        {x: 5, y: 8},
                        {x: 6, y: 12},
                        {x: 7, y: 14},
                        {x: 8, y: 12},
                        {x: 9, y: 13.5},
                        {x: 10, y: 18},
                      ]
                }
                theme={{
                  stroke: {color: '#1CA2BB', width: 5},
                  scatter: {
                    default: {width: 4, height: 4, rx: 2, color: '#1CA2BB'},
                  },
                }}
              />
            </Chart>
          </View>
        </View>
      );
    }
  }
}
function DropDown(props) {
  const itemsList = [
    {label: '7 ngày', value: '7day'},
    {label: '30 ngày', value: '30day'},
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState(itemsList);
  return (
    <DropDownPicker
      placeholder={'30 ngày'}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      maxHeight={300}
      containerStyle={{
        width: '30%',
        height: '8%',
        marginLeft: '50%',
      }}
      textStyle={{
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
      }}
      onChangeValue={value => {
        props.callDropDownValue(value.toString());
      }}
      style={styles.dropdown}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
  },
  headerTitle: {
    fontSize: 45,
    color: '#000000',
    fontFamily: 'Roboto-Bold',
    marginVertical: '2%',
  },
  TDEEInfoContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 15,
    width: '90%',
    height: '25%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '3%',
  },
  TDEEInfoTitle: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'Roboto-Regular',
    width: '95%',
    height: '65%',
    marginTop: '3%',
  },
  userInfoTDEEContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '20%',
    width: '95%',
    marginBottom: '3%',
  },
  title: {
    fontSize: 25,
    color: '#005E7C',
    fontFamily: 'Roboto-Bold',
    width: '40%',
  },
  userTDEE: {
    fontSize: 35,
    color: '#F44336',
    fontFamily: 'Roboto-Bold',
  },
  chartContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 15,
    width: '90%',
    height: '60%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '3%',
  },
  chartTitle: {
    fontSize: 25,
    fontFamily: 'Roboto-Bold',
    marginTop: '3%',
  },
});

export default CalosAnalysis;
