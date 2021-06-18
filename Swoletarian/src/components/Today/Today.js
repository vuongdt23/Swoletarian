/* eslint-disable react/self-closing-comp */
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  ScrollView,
  ActivityIndicator,
  SectionList,
} from 'react-native';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);
import {CheckBox} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import AbsIcon from '../../assets/Icon/workout/AbsIcon.png';
import BackIcon from '../../assets/Icon/workout/BackIcon.png';
import ChestIcon from '../../assets/Icon/workout/ChestIcon.png';
import TricepIcon from '../../assets/Icon/workout/TricepIcon.png';
import ShoulderIcon from '../../assets/Icon/workout/ShoulderIcon.png';
import BicepIcon from '../../assets/Icon/workout/BicepIcon.png';
import LegIcon from '../../assets/Icon/workout/LegIcon.png';
import {
  getSchedulesbyUser,
  getScheduleDetailsbySchedule,
} from '../../Firebase/ScheduleAPI';
import {getExercisebyID} from '../../Firebase/ExerciseAPI';
import {
  uploadGainRecap,
  getTodaysGainRecapByUser,
  getTodaysBurnRecapByUser,
} from '../../Firebase/reportAPI';
import {
  getMenubyCurrentUser,
  getMenuDetailsfromMenu,
} from '../../Firebase/MenuAPI';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getFoodbyID} from '../../Firebase/foodAPI';
import {getUserSetup} from '../../Firebase/userAPI';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Tab = createMaterialTopTabNavigator();
const todayString = () => {
  var d = new Date();
  var weekday = new Array(7);
  weekday[0] = 'sunday';
  weekday[1] = 'monday';
  weekday[2] = 'tuesday';
  weekday[3] = 'wednesday';
  weekday[4] = 'thursday';
  weekday[5] = 'friday';
  weekday[6] = 'saturday';
  var today = weekday[d.getDay()];
  return today;
};
class Today extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentDisplayValue: '',
      currentDayWorkouts: [],
      isCompleteWorkouts: false,
      isCompleteNutrions: false,
      Breakfast: {},
      Lunch: {},
      Dinner: {},
      Snack: {},
      userInfo: {},
    };
  }
  reload = () => {
    this.setState({
      isLoading: true,
      Breakfast: {},
      Lunch: {},
      Dinner: {},
      Snack: {},
    });
    this.componentDidMount();
  };
  componentDidMount() {
    this.loadUserInfo();
    getTodaysGainRecapByUser()
      .then(res => {
        if (!res.empty) {
          this.setState({isCompleteNutrions: true});
        }
      })
      .catch(err => console.log(err));
    getTodaysBurnRecapByUser()
      .then(res => {
        if (!res.empty) {
          this.setState({isCompleteWorkouts: true});
        }
      })
      .catch(err => console.log(err));
    this.loadSchedules();
    this.loadMenus();
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 5000);
  }
  loadUserInfo = () => {
    getUserSetup().then(res => {
      res.forEach(doc => {
        this.setState({userInfo: doc.data()});
      });
    });
  };
  resetCurrentCalosBurnedAndGained = () => {
    this.setState({currentTotalCalosBurned: 0});
    this.setState({currentTotalCalosGained: 0});
  };
  loadMenus = () => {
    let tempMenuArr = [];
    //let finalMenuArr = [];
    getMenubyCurrentUser()
      .then(res => {
        res.forEach(doc => {
          let tempMenuObj = doc.data();
          tempMenuObj.menuID = doc.id;

          tempMenuArr.push(tempMenuObj);
        });
        tempMenuArr.forEach(menu => {
          let menuDetailList = {
            menuID: menu.menuID,
            menuType: menu.menuType,
            menuDetails: [],
          };

          //  console.log ('initial menu list', menuDetailList);
          getMenuDetailsfromMenu(menu.menuID)
            .then(res => {
              if (res.empty) {
                this.setState({
                  Breakfast: [],
                  Lunch: [],
                  Dinner: [],
                  Snack: [],
                });
              } else {
                res.forEach(doc => {
                  let tempMenuObj = doc.data();
                  tempMenuObj.menuDetailID = doc.id;
                  getFoodbyID(doc.data().foodID)
                    .then(resp => {
                      tempMenuObj.foodCalories = resp.data().foodCalories;
                      tempMenuObj.foodName = resp.data().foodName;
                      menuDetailList.menuDetails.push(tempMenuObj);
                      //console.log('menu getting', menuDetailList);
                      if (menuDetailList.menuType === 'breakfast') {
                        this.setState({Breakfast: menuDetailList}, () => {});
                      }
                      if (menuDetailList.menuType === 'lunch') {
                        this.setState({Lunch: menuDetailList});
                      }
                      if (menuDetailList.menuType === 'dinner') {
                        this.setState({Dinner: menuDetailList});
                      }
                      if (menuDetailList.menuType === 'snack') {
                        this.setState({Snack: menuDetailList});
                      }
                    })
                    .catch(err => {
                      console.log(err);
                    });
                });
              }
            })
            .catch(err => console.log(err));
        });

        // console.log ('Menus by this user', tempMenuArr);
      })
      .catch(err => {
        console.log(err);
      });
  };

  loadSchedules = () => {
    let weekday = todayString();
    //console.log(todayString);
    let tempScheduleArr = [];
    let scheduleDetailArr = [];
    let exerciseArr = [];
    getSchedulesbyUser()
      .then(res => {
        res.forEach(doc => {
          let tempSchObj = doc.data();
          tempSchObj.scheduleID = doc.id;

          tempScheduleArr.push(tempSchObj);
        });

        let todayIndex = tempScheduleArr.findIndex(
          schedule => schedule.scheduleType === weekday,
        );

        getScheduleDetailsbySchedule(tempScheduleArr[todayIndex].scheduleID)
          .then(res => {
            res.forEach(doc => {
              let scheduleDetailObj = doc.data();
              scheduleDetailObj.scheduleDetailID = doc.id;
              scheduleDetailArr.push(scheduleDetailObj);
            });
            if (scheduleDetailArr.length === 0) {
              this.setState({currentDayWorkouts: exerciseArr});
            } else {
              scheduleDetailArr.forEach(scheduleDetail => {
                getExercisebyID(scheduleDetail.exerciseID)
                  .then(res => {
                    let exerciseObj = res.data();
                    (exerciseObj.rep = scheduleDetail.rep),
                      (exerciseObj.set = scheduleDetail.set);
                    exerciseArr.push(exerciseObj);
                    this.setState({currentDayWorkouts: exerciseArr});
                  })
                  .catch(err => console.log(err));
              });
            }
          })
          .catch(err => console.log(err));

        // console.log ('Menus by this user', tempMenuArr);
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
    }
    return (
      <View style={styles.container}>
        <Tab.Navigator
          style={styles.contentContainer}
          tabBarOptions={{
            labelStyle: {fontSize: 25, fontFamily: 'Roboto-Bold'},
          }}>
          <Tab.Screen
            name="Luyện tập"
            children={() => (
              <ScheduleWrap
                currentDayWorkouts={this.state.currentDayWorkouts}
              />
            )}
          />
          <Tab.Screen
            name="Dinh dưỡng"
            children={() => (
              <MenuWrap
                Breakfast={this.state.Breakfast}
                Lunch={this.state.Lunch}
                Dinner={this.state.Dinner}
                Snack={this.state.Snack}
                isCompleteNutrions={this.state.isCompleteNutrions}
                reload={() => this.reload()}></MenuWrap>
            )}
          />
        </Tab.Navigator>
      </View>
    );
  }
}

export class ScheduleWrap extends React.Component {
  state = {currentTotalCalosBurned: 0};
  handleWorkoutChecked = (totalCalosBurned, isChecked) => {
    var newTotalCalosBurned = this.state.currentTotalCalosBurned;
    isChecked
      ? (newTotalCalosBurned = newTotalCalosBurned - totalCalosBurned)
      : (newTotalCalosBurned = newTotalCalosBurned + totalCalosBurned);
    this.setState({currentTotalCalosBurned: newTotalCalosBurned});
  };
  completeCurrentDayWorkouts = () => {
    Alert.alert(
      'Xác nhận hoàn thành',
      'Bạn muốn xác nhận đã hoàn thành các bài tập ngày hôm nay?',
      [
        {
          text: 'Hủy',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            this.setState({isCompleteWorkouts: true});
          },
        },
      ],
    );
  };
  render() {
    return (
      <View style={styles.insideContentContainer}>
        <FlatList
          numColumns={1}
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
          data={this.props.currentDayWorkouts}
          renderItem={({item}) => (
            <Exercise
              data={item}
              handleWorkoutChecked={(totalCalosBurned, isChecked) => {
                this.handleWorkoutChecked(totalCalosBurned, isChecked);
              }}
            />
          )}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
        />
        <View style={styles.totalContainer}>
          <TouchableOpacity
            disabled={this.state.isCompleteWorkouts ? true : false}
            style={styles.completeButton}
            onPress={() => {
              this.completeCurrentDayWorkouts();
            }}>
            <Text style={styles.completeButtonTitle}>Hoàn thành</Text>
          </TouchableOpacity>
          <Text style={styles.currentTotalCalosBurned}>
            {this.state.currentTotalCalosBurned} calos
          </Text>
        </View>
      </View>
    );
  }
}

export class MenuWrap extends React.Component {
  state = {currentTotalCalosGained: 0, isLoading: true};
  handleNutrionChecked = (totalCalosGained, isChecked) => {
    var newTotalCalosGained = this.state.currentTotalCalosGained;
    isChecked
      ? (newTotalCalosGained = newTotalCalosGained - totalCalosGained)
      : (newTotalCalosGained = newTotalCalosGained + totalCalosGained);
    this.setState({currentTotalCalosGained: newTotalCalosGained});
  };
  completeCurrentDayNutrions = () => {
    Alert.alert(
      'Xác nhận hoàn thành',
      'Bạn muốn xác nhận đã hoàn thành thực đơn dinh dưỡng ngày hôm nay?',
      [
        {
          text: 'Hủy',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            let gainObj = {
              gainRecapOwner: auth().currentUser.uid,
              gainRecapDate: firestore.Timestamp.fromDate(new Date()),
              gainCalories: this.state.currentTotalCalosGained,
            };
            console.log('obj', gainObj);
            uploadGainRecap(gainObj)
              .then(res => {
                console.log(res);
                Alert.alert('Xác nhận hoàn thành thành công', '', [
                  {
                    text: 'OK',
                    onPress: () => {},
                    style: 'cancel',
                  },
                ]);
                this.props.reload();
              })
              .catch(err => {
                console.log(err);
              });
          },
        },
      ],
    );
  };
  render() {
    const DATA = [
      {
        title: 'Sáng',
        data: this.props.Breakfast.menuDetails
          ? this.props.Breakfast.menuDetails.length > 0
            ? this.props.Breakfast.menuDetails
            : []
          : [],
      },
      {
        title: 'Trưa',
        //data: this.props.Lunch.menuDetails,
        data: this.props.Lunch.menuDetails
          ? this.props.Lunch.menuDetails.length > 0
            ? this.props.Lunch.menuDetails
            : []
          : [],
      },
      {
        title: 'Tối',
        //data: this.props.Dinner.menuDetails,
        data: this.props.Dinner.menuDetails
          ? this.props.Dinner.menuDetails.length > 0
            ? this.props.Dinner.menuDetails
            : []
          : [],
      },
      {
        title: 'Bữa phụ',
        //data: this.props.Snack.menuDetails,
        data: this.props.Snack.menuDetails
          ? this.props.Snack.menuDetails.length > 0
            ? this.props.Snack.menuDetails
            : []
          : [],
      },
    ];
    return (
      <View style={styles.insideContentContainer}>
        <SectionList
          sections={DATA}
          renderItem={({item}) => (
            <Nutrion
              data={item}
              handleNutrionChecked={(totalCalosGained, isChecked) => {
                this.handleNutrionChecked(totalCalosGained, isChecked);
              }}
            />
          )}
          renderSectionHeader={({section}) => (
            <Text style={styles.nutrionWrapTitle}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
        />
        <View style={styles.totalContainer}>
          <TouchableOpacity
            disabled={this.props.isCompleteNutrions ? true : false}
            style={
              this.props.isCompleteNutrions
                ? styles.completeButtonDisable
                : styles.completeButton
            }
            onPress={() => {
              this.completeCurrentDayNutrions();
            }}>
            <Text style={styles.completeButtonTitle}>Hoàn thành</Text>
          </TouchableOpacity>
          <Text style={styles.currentTotalCalosBurned}>
            {this.state.currentTotalCalosGained} calos
          </Text>
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
      isChecked: false,
    };
  }

  onToggleInfoModal = () => {
    this.setState({infoModalVisible: !this.state.infoModalVisible});
  };
  setIsChecked = check => {
    const {data} = this.props;
    this.setState({isChecked: check});
    let totalCalosBurned = (
      ((parseInt(data.exerciseCalories) * data.rep * data.set) / 60) *
      25
    ).toPrecision(2);
    this.props.handleWorkoutChecked(
      parseInt(totalCalosBurned),
      this.state.isChecked,
    );
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
            <Text style={styles.repsContentStyle}>{data.set} sets</Text>
          </View>
          <View style={styles.repsContainer}>
            <Text style={styles.repsContentStyle}>{data.rep} reps</Text>
          </View>
        </View>
        <CheckBox
          checked={this.state.isChecked}
          size={35}
          onPress={() => this.setIsChecked(!this.state.isChecked)}
        />
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
                source={data.exerciseImage}
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
class Nutrion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }
  setIsChecked = () => {
    //console.log('Nutrion:1 ' + this.state.isChecked);
    const {data} = this.props;
    this.setState({isChecked: !this.state.isChecked});
    let calos = Math.round((parseInt(data.foodCalories) * data.amount) / 100);
    this.props.handleNutrionChecked(calos, this.state.isChecked);
    //console.log('Nutrion:2 ' + calos + this.state.isChecked.toString());
  };
  render() {
    const {data} = this.props;
    let calos = Math.round((parseInt(data.foodCalories) * data.amount) / 100);
    return (
      <View style={styles.nutrionContainer}>
        <Text style={styles.nutrionTitle}>{data.foodName}</Text>
        <Text style={styles.caloTitle}>{data.foodCalories} calos/100gram</Text>
        <View style={styles.calosContainer}>
          <Text style={styles.gramsTitle}>{data.amount} grams</Text>
          <Text style={styles.calosTitle}>{calos.toString()} calos</Text>
        </View>
        <CheckBox
          checked={this.state.isChecked}
          size={35}
          onPress={() => {
            this.setIsChecked();
          }}
        />
      </View>
    );
  }
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
    marginVertical: '2%',
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
    height: '80%',
    width: '100%',
    backgroundColor: 'white',
  },
  insideContentContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: '3%',
    paddingVertical: '3%',
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
  totalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    height: '10%',
    width: '100%',
    paddingHorizontal: '5%',
  },
  currentTotalCalosBurned: {
    color: '#F43C3C',
    fontSize: 40,
    fontFamily: 'Roboto-Bold',
    width: '60%',
    textAlign: 'right',
  },
  completeButton: {
    backgroundColor: '#1CA2BB',
    borderRadius: 10,
    width: '40%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5%',
  },
  completeButtonDisable: {
    backgroundColor: 'gray',
    borderRadius: 10,
    width: '40%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5%',
  },
  completeButtonTitle: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'Roboto-Bold',
  },
  nutrionContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: '2%',
  },
  nutrionTitle: {
    fontSize: 25,
    fontFamily: 'Roboto-Bold',
    width: '20%',
  },
  caloTitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    width: '40%',
  },
  calosContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
  },
  gramsTitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: '#40F43C',
  },
  calosTitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: '#F43C3C',
  },
  nutrionWrapTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingLeft: '2%',
  },
  nutrionWrapTitle: {
    fontSize: 35,
    fontFamily: 'Roboto-Bold',
  },
});

export default Today;
