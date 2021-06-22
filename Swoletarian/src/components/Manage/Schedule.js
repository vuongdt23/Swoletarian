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
  ActivityIndicator,
  ScrollView,
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
  deleteScheduleDetail,
  getDefautSchedulesbyName,
  clearCurrentUserSchedule,
  createScheduleDetail,
} from '../../Firebase/ScheduleAPI';
import {getExercisebyID} from '../../Firebase/ExerciseAPI.js';
import {getUserSetup} from '../../Firebase/userAPI.js';
import firestore from '@react-native-firebase/firestore';
class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      scheduleDetails: [],
      currentDayWorkouts: [],
      currentDayName: '',
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
      userInfo: null,
    };
  }
  reload = () => {
    this.setState({isLoading: true});
    this.componentDidMount();
  };
  reloadAfterDeletion = (currentSchedule, deletedScheduleDetailID) => {
    let tempWorkoutState = [...this.state[currentSchedule]];
    console.log('current list to delete', tempWorkoutState);
    console.log('current schedule day', currentSchedule);

    let indexDel = tempWorkoutState.findIndex(
      detail => detail.scheduleDetailID === deletedScheduleDetailID,
    );
    console.log('delete at ', indexDel);
    if (indexDel > -1) {
      tempWorkoutState.splice(indexDel, 1);
      console.log('workouts state after deletion', tempWorkoutState);
    }
    this.loadSchedules();
    this.setState({
      currentDayWorkouts: tempWorkoutState,
      [currentSchedule]: tempWorkoutState,
    });
  };
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
    // console.log ('detail Array', details);

    if (details.length === 0) {
      this.setState({[dayFiled]: tempExercises}, () => {
        this.setState({currentDayWorkouts: [...this.state[dayFiled]]});
      });
    } else {
      details.forEach(detail => {
        //console.log ('detail', detail);
        let exerciseObj = null;
        //  console.log(detail);
        getExercisebyID(detail.exerciseID)
          .then(res => {
            // console.log('id', detail.scheduleDetailID);
            exerciseObj = res.data();
            // console.log ('exercise', res.data ());

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
      case 'Sunday':
        this.loadExercisesbyDay('sunday');
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
                {
                  scheduleDetails: finalScheduleArr,
                  isLoading: false,
                  currentDayWorkouts: [],
                },
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
  deleteScheduleDetail = scheduleDetailID => {
    Alert.alert('Xóa bài tập', 'Bạn muốn xóa bài tập này khỏi lịch tập ?', [
      {
        text: 'Hủy',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Xóa',
        onPress: () => {
          deleteScheduleDetail(scheduleDetailID)
            .then(res => {
              //   console.log(res);
              this.reloadAfterDeletion(
                this.state.currentDayName,
                scheduleDetailID,
              );
              Alert.alert('Xóa thành công', '', [
                {
                  text: 'OK',
                  onPress: () => {},
                  style: 'cancel',
                },
              ]);
            })
            .catch(err => {
              console.log(err);
            });
        },
      },
    ]);
  };

  componentDidMount() {
    this.loadSchedules();
    getUserSetup().then(res => {
      res.forEach(doc => {
        this.setState({userInfo: doc.data()});
      });
    });
  }
  handleClearCurrentUserSchedule = () => {
    Alert.alert('Xóa lịch tập', 'Bạn muốn xóa lịch tập hiện tại?', [
      {
        text: 'Hủy',
        onPress: () => {
          return;
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          clearCurrentUserSchedule();
          this.reload();
          Alert.alert('Xóa lịch tập thành công', '', [
            {
              text: 'OK',
              onPress: () => {
                return;
              },
              style: 'cancel',
            },
          ]);
        },
      },
    ]);
  };
  handleUseRecomendedSchedule = () => {
    Alert.alert(
      'Lịch tập đề xuất',
      'Bạn muốn sử dụng lịch tập do hệ thống đề xuất ?',
      [
        {
          text: 'Hủy',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            let BMI = parseFloat(
              (this.state.userInfo.userWeight /
                this.state.userInfo.userHeight /
                this.state.userInfo.userHeight) *
                10000,
            ).toPrecision(4);
            console.log('bmi', BMI);
            console.log('type of user', this.state.userInfo.userType);
            switch (this.state.userInfo.userType) {
              case 'beginner':
                if (BMI <= 18.5) {
                  clearCurrentUserSchedule();
                  this.createCopyfromDefaultSchedule('beginnerOne').then(
                    this.reload(),
                  );
                } else {
                  clearCurrentUserSchedule();
                  this.createCopyfromDefaultSchedule('beginnerTwo').then(() => {
                    this.reload();
                  });
                }
                break;
              case 'intermediate':
                clearCurrentUserSchedule();
                this.createCopyfromDefaultSchedule('intermediate').then(() => {
                  this.reload();
                });
                break;
              case 'advanced':
                clearCurrentUserSchedule();
                this.createCopyfromDefaultSchedule('advanced').then(() => {
                  this.reload();
                });
                break;
            }
            Alert.alert('Cập nhật lịch tập thành công', '', [
              {
                text: 'OK',
                onPress: () => {},
                style: 'cancel',
              },
            ]);
          },
        },
      ],
    );
  };
  createCopyfromDefaultSchedule = async scheduleName => {
    let userScheduleArr = [];
    this.state.scheduleDetails.forEach(schedule => {
      let schObj = {
        scheduleID: schedule.scheduleID,
        scheduleType: schedule.scheduleType,
      };
      userScheduleArr.push(schObj);
    });

    //console.log('userSchedule List', userScheduleArr);

    await this.loadDefaultSchedulesbyName(scheduleName)
      .then(res => {
        res.forEach(async schedule => {
          let scheduleIndex = userScheduleArr.findIndex(
            userSch => userSch.scheduleType === schedule.scheduleType,
          );
          let newSchID = userScheduleArr[scheduleIndex].scheduleID;
          await this.setdefaultSchedulesasNew(schedule.scheduleID, newSchID)
            .then(resultz => {
              resultz.forEach(document => {
                createScheduleDetail(document)
                  .then(result => {
                    console.log(result);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
            })
            .catch(err => {
              console.log(err);
            });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  setdefaultSchedulesasNew = async (oldscheduleID, newScheduleID) => {
    let resultArr = [];
    await this.loadScheduleDetailfromID(oldscheduleID).then(result => {
      result.forEach(doc => {
        doc.scheduleID = newScheduleID;
        resultArr.push(doc);
      });
    });
    return resultArr;
  };
  loadScheduleDetailfromID = async scheduleID => {
    let detailList = [];
    await getScheduleDetailsbySchedule(scheduleID)
      .then(res => {
        res.forEach(doc => {
          detailList.push(doc.data());
        });
      })
      .catch(err => {
        console.log(err);
      });
    return detailList;
  };
  loadDefaultSchedulesbyName = async scheduleName => {
    let ScheduleList = [];
    await getDefautSchedulesbyName(scheduleName)
      .then(res => {
        res.forEach(doc => {
          let schObj = doc.data();
          schObj.scheduleID = doc.id;
          ScheduleList.push(schObj);
          //  console.log(doc.data());
        });
      })
      .catch(err => {
        console.log(err);
      });
    return ScheduleList;
  };
  render() {
    if (this.state.isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#1CA2BB" />
        </View>
      );
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Lịch tập luyện</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateContent}>{new Date().toDateString()}</Text>
        </View>
        <DropDown callDropDownValue={day => this.setDayOfWeek(day)} />
        <View style={styles.contentContainer}>
          <FlatList
            numColumns={1}
            contentContainerStyle={{}}
            showsVerticalScrollIndicator={false}
            data={this.state.currentDayWorkouts}
            renderItem={({item}) => (
              <Exercise
                data={item}
                deleteScheduleDetail={scheduleDetailID => {
                  this.deleteScheduleDetail(scheduleDetailID);
                }}
              />
            )}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
          />
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
                this.handleClearCurrentUserSchedule();
              }}>
              <Text style={styles.addNewContent}>Xóa lịch hiện tại</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.handleUseRecomendedSchedule();
              }}>
              <Text style={styles.addNewContent}>Lịch tập đề xuất</Text>
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
          style={{marginLeft: '3%', width: '8%', height: '80%'}}
        />
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
            this.props.deleteScheduleDetail(data.scheduleDetailID);
          }}
          style={{width: '10%', height: '80%'}}>
          <Image
            source={DeleteIcon}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </TouchableOpacity>
        <View style={styles.infoModalContainer}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.infoModalVisible}>
            <View style={styles.infoModalView}>
              <Text style={styles.infoExerciseTitle}>{data.exerciseName}</Text>
              <ScrollView style={{height: '30%'}}>
                <Text style={styles.infoExerciseDescription}>
                  {data.exerciseDescription}
                </Text>
              </ScrollView>

              <Image
                source={data.exerciseImage.uri ? data.exerciseImage : TapLuyen}
                style={{
                  height: '40%',
                  width: '90%',
                  resizeMode: 'stretch',
                  margin: '2%',
                }}
              />
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
    {label: 'Sunday', value: 'Sunday'},
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
    justifyContent: 'center',
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
