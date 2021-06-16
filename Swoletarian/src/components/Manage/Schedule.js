import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {FlatList} from 'react-native-gesture-handler';
import AbsIcon from '../../assets/Icon/workout/AbsIcon.png';
import BackIcon from '../../assets/Icon/workout/BackIcon.png';
import ChestIcon from '../../assets/Icon/workout/ChestIcon.png';
import TricepIcon from '../../assets/Icon/workout/TricepIcon.png';
import ShoulderIcon from '../../assets/Icon/workout/ShoulderIcon.png';
import BicepIcon from '../../assets/Icon/workout/BicepIcon.png';
import LegIcon from '../../assets/Icon/workout/LegIcon.png';
import DeleteIcon from '../../assets/Icon/DeleteIcon.png';
import TapLuyen from '../../assets/manage/TapLuyen.png';

import {
  getSchedulesbyUser,
  getScheduleDetailsbySchedule,
} from '../../Firebase/ScheduleAPI';
import {getExercisebyID} from '../../Firebase/ExerciseAPI.js';
class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleDetails: [],
      currentDayWorkouts: [],
      currentDayName: '',
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    };
  }
  loadExercisesbyDay = day => {
    let dayFiled = capitalizeFirstLetter(day);
    let tempExercises = [];
    let scheduleIndex = this.state.scheduleDetails.findIndex(
      schedule => schedule.scheduleType === day,
    );

    //console.log('schedule index', scheduleIndex);
    let details = [
      ...this.state.scheduleDetails[scheduleIndex].scheduleDetails,
    ];
    //console.log('detail Array', details);

    if (details.length === 0) {
      this.setState({[dayFiled]: tempExercises}, () => {
        this.setState({currentDayWorkouts: [...this.state[dayFiled]]});
      });
    } else {
      details.forEach(detail => {
        let exerciseObj = null;
        //  console.log(detail);
        getExercisebyID(detail.exerciseID)
          .then(res => {
            // console.log('id', detail.scheduleDetailID);
            exerciseObj = res.data();
            // console.log('exercise', res.data());

            exerciseObj.scheduleDetailID = detail.scheduleDetailID;
            exerciseObj.rep = detail.rep;
            exerciseObj.set = detail.set;
            //   console.log('exercise Object', exerciseObj);
            tempExercises.push(exerciseObj);
            this.setState({[dayFiled]: tempExercises}, () => {
              this.setState({currentDayWorkouts: [...this.state[dayFiled]]});
            });
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  };
  setDayOfWeek = day => {
    this.setState({currentDayName: day});
    switch (day) {
      case 'Monday':
        this.loadExercisesbyDay('monday');
        break;
      case 'Tuesday':
        this.loadExercisesbyDay('tuesday');
        break;
      case 'Wednesday':
        this.loadExercisesbyDay('wednesday');
        break;
      case 'Thursday':
        this.loadExercisesbyDay('thursday');
        break;
      case 'Friday':
        this.loadExercisesbyDay('friday');
        break;
      case 'Saturday':
        this.loadExercisesbyDay('saturday');
        break;
    }
  };

  loadSchedules = () => {
    let tempScheduleArr = [];
    let finalScheduleArr = [];
    getSchedulesbyUser()
      .then(res => {
        res.forEach(doc => {
          let tempSchObj = doc.data();
          tempSchObj.scheduleID = doc.id;

          tempScheduleArr.push(tempSchObj);
        });
        tempScheduleArr.forEach(schedule => {
          let scheduleDetailList = {
            scheduleID: schedule.scheduleID,
            scheduleType: schedule.scheduleType,
            scheduleDetails: [],
          };

          //  console.log ('initial menu list', menuDetailList);
          getScheduleDetailsbySchedule(schedule.scheduleID)
            .then(res => {
              if (res.empty) finalScheduleArr.push(scheduleDetailList);
              else {
                res.forEach(doc => {
                  let tempSchObj = doc.data();
                  tempSchObj.scheduleDetailID = doc.id;
                  scheduleDetailList.scheduleDetails.push(tempSchObj);
                  //  console.log (menuDetailList);
                });
                finalScheduleArr.push(scheduleDetailList);
              }
              this.setState(
                {scheduleDetails: finalScheduleArr, isLoading: false},
                () => {},
              );
            })
            .catch(err => console.log(err));
        });

        // console.log ('Menus by this user', tempMenuArr);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.loadSchedules();
    getExercisebyID('14Qt61VLBIVsmrodYTVX')
      .then(res => {
        console.log('Test get by ID', res.data());
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Lịch tập luyện</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateContent}>{new Date().toDateString()}</Text>
        </View>
        <DropDown callDropDownValue={day => this.setDayOfWeek(day)}></DropDown>
        <View style={styles.contentContainer}>
          <FlatList
            numColumns={1}
            contentContainerStyle={{}}
            showsVerticalScrollIndicator={false}
            data={this.state.currentDayWorkouts}
            renderItem={({item}) => (
              <Exercise
                data={item}
                deleteExercise={exercise => {
                  this.deleteExercise(exercise);
                }}></Exercise>
            )}
            keyExtractor={(item, index) => {
              return index.toString();
            }}></FlatList>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: '15%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.deleteCurrentSchedule();
              }}>
              <Text style={styles.addNewContent}>Xóa lịch hiện tại</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.addNewContent}>Tạo lịch tự động</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.addNewButton}
            onPress={() => {
              this.props.navigation.navigate('Workout');
            }}>
            <Text style={styles.addNewContent}>Thêm bài tập mới</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoModalVisible: false,
    };
  }

  onToggleInfoModal = () => {
    this.setState({infoModalVisible: !this.state.infoModalVisible});
  };
  render() {
    const {data} = this.props;
    let dataIconType = AbsIcon;
    switch (data.exerciseType) {
      case 'abs':
        dataIconType = AbsIcon;
        break;
      case 'chest':
        dataIconType = ChestIcon;
        break;
      case 'tricep':
        dataIconType = TricepIcon;
        break;
      case 'shoulder':
        dataIconType = ShoulderIcon;
        break;
      case 'back':
        dataIconType = BackIcon;
        break;
      case 'bicep':
        dataIconType = BicepIcon;
        break;
      case 'leg':
        dataIconType = LegIcon;
        break;
      default:
        dataIconType = LegIcon;
        break;
    }
    return (
      <TouchableOpacity
        style={styles.exerciseContainer}
        onPress={this.onToggleInfoModal}>
        <Image
          source={dataIconType}
          style={{marginLeft: '3%', width: '8%', height: '80%'}}></Image>
        <Text style={styles.exerciseTitle}>{data.exerciseName}</Text>
        <View style={styles.repSetContainer}>
          <View style={styles.setsContainer}>
            <Text style={styles.repsContentStyle}>{data.set} set</Text>
          </View>
          <View style={styles.repsContainer}>
            <Text style={styles.repsContentStyle}>{data.rep} rep</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.deleteExercise(data);
          }}
          style={{width: '10%', height: '80%'}}>
          <Image
            source={DeleteIcon}
            style={{
              width: '100%',
              height: '100%',
            }}></Image>
        </TouchableOpacity>
        <View style={styles.infoModalContainer}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.infoModalVisible}>
            <View style={styles.infoModalView}>
              <Text style={styles.infoExerciseTitle}>{data.exerciseName}</Text>
              <Text style={styles.infoExerciseDescription}>
                {data.exerciseDescription}
              </Text>
              <Image
                source={data.exerciseImage.uri ? data.exerciseImage : TapLuyen}
                style={{
                  height: '40%',
                  width: '90%',
                  resizeMode: 'stretch',
                  margin: '2%',
                }}></Image>
              <Pressable
                style={{
                  width: '40%',
                  height: '8%',
                  borderRadius: 25,
                  backgroundColor: '#C8FFFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={this.onToggleInfoModal}>
                <Text style={{fontSize: 25, fontFamily: 'Roboto-Bold'}}>
                  OK
                </Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
    );
  }
}

function DropDown(props) {
  const itemsList = [
    {label: 'Monday', value: 'Monday'},
    {label: 'Tuesday', value: 'Tuesday'},
    {label: 'Wednesday', value: 'Wednesday'},
    {label: 'Thursday', value: 'Thursday'},
    {label: 'Friday', value: 'Friday'},
    {label: 'Saturday', value: 'Saturday'},
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState(itemsList);
  return (
    <DropDownPicker
      placeholder={''}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      maxHeight={300}
      containerStyle={{
        width: '90%',
      }}
      textStyle={{
        fontSize: 28,
        fontFamily: 'Roboto-Bold',
      }}
      onChangeValue={value => {
        props.callDropDownValue(value.toString());
      }}
    />
  );
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const styles = StyleSheet.create({
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
  },
  dateContent: {
    fontSize: 30,
    fontFamily: 'Roboto-Light',
    color: '#1CA2BB',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
    marginBottom: '5%',
  },
  contentContainer: {
    marginTop: '5%',
    height: '75%',
    width: '90%',
  },
  exerciseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 10,
    paddingHorizontal: '2%',
    height: 60,
    marginRight: '4%',
    backgroundColor: 'white',
    width: '100%',
  },
  exerciseTitle: {
    fontSize: 25,
    fontFamily: 'Roboto-Bold',
    width: '40%',
  },
  infoModalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '90%',
  },
  infoExerciseTitle: {fontSize: 30, fontFamily: 'Roboto-Bold'},
  infoExerciseDescription: {fontSize: 20, fontFamily: 'Roboto-Regular'},
  repSetContainer: {
    height: '100%',
    width: '20%',
    borderRadius: 25,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  repsContainer: {
    height: '40%',
    width: '80%',
    backgroundColor: '#1CA2BB',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  repsContentStyle: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Roboto-Bold',
  },
  setsContainer: {
    height: '40%',
    width: '80%',
    backgroundColor: '#5CEC4F',
    borderRadius: 25,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  addNewButton: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#1CA2BB',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    marginBottom: 10,
  },
  addNewContent: {
    fontSize: 25,
    fontFamily: 'Roboto-Bold',
  },
  button: {
    width: '48%',
    borderRadius: 5,
    backgroundColor: '#1CA2BB',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
    marginBottom: 10,
  },
});

export default Schedule;
