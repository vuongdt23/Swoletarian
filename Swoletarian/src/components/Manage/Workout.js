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
import {CheckBox} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import AbsIcon from '../../assets/Icon/workout/AbsIcon.png';
import BackIcon from '../../assets/Icon/workout/BackIcon.png';
import ChestIcon from '../../assets/Icon/workout/ChestIcon.png';
import TricepIcon from '../../assets/Icon/workout/TricepIcon.png';
import ShoulderIcon from '../../assets/Icon/workout/ShoulderIcon.png';
import BicepIcon from '../../assets/Icon/workout/BicepIcon.png';
import LegIcon from '../../assets/Icon/workout/LegIcon.png';
import AddIcon from '../../assets/Icon/AddIcon.png';
import DeleteIcon from '../../assets/Icon/DeleteIcon.png';
import InfoIcon from '../../assets/Icon/InfoIcon.png';
<<<<<<< HEAD
import getExerciseTypes from '../../Firebase/exerciseAPI';
=======
import TapLuyen from '../../assets/manage/TapLuyen.png';
import auth from '@react-native-firebase/auth';
import {
  getExerciseTypes,
  getExercisesbyCurrentUser,
  addExercise,
  deleteExercise,
  getDefaultExercises,
} from '../../Firebase/ExerciseAPI';
import {
  getSchedulesbyUser,
  getScheduleTypeNamebyID,
  getScheduleTypes,
} from '../../Firebase/ScheduleAPI';
>>>>>>> 86d65a33621de1ff6f1d3d94f6bba38d66d8ec17
class Workout extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      isLoading: true,
      exerciseTypes: [],
      exercises: [],
<<<<<<< HEAD
      exerciseTypes: [],
      type: [
        {id: 1, name: 'abs'},
        {id: 2, name: 'shoulder'},
        {id: 3, name: 'tricep'},
        {id: 4, name: 'back'},
        {id: 5, name: 'bicep'},
        {id: 6, name: 'leg'},
        {id: 7, name: 'chest'},
      ],
      absExcs: [
        {
          id: 1,
          name: 'Plank',
          description:
            'Vào tư thế plank, đặt tay ngay dưới vai, hóp cơ và lưng phẳng. Ngoài ra, bạn sẽ muốn đặt một chiếc khăn nhỏ dưới mỗi bàn chân. Trên sàn gỗ cứng hoặc vải sơn, kéo cơ thể của bạn từ bên này sang bên kia của căn phòng, kéo trọng lượng cơ thể của bạn bằng cách sử dụng cánh tay của bạn để di chuyển xung quanh. Một chuyến đi qua phòng, cả ở đó và trở lại, được tính là một vòng. Lặp lại điều này ba lần.',
          imgLink: {
            uri:
              'https://wheyshop.vn/wp-content/uploads/2017/07/maxresdefault.jpg',
          },
          caloBurned: 12,
          exerciseType: 'abs',
          isSystem: 'false',
        },
        {
          id: 2,
          name: 'Jump lunges',
          description:
            'Bắt đầu với hai bàn chân của bạn với nhau, khuỷu tay uốn cong 90 độ và sau đó lao về phía trước như hình minh họa. Tiếp theo, nhảy thẳng lên khi bạn giơ hai tay lên trần nhà (nhưng vẫn giữ cho khuỷu tay cong!) Sau đó tiếp đất bằng tư thế lunge với chân đối diện về phía trước lần này.',
          imgLink: {
            uri:
              'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F12%2F2013%2F08%2Fimg_2068.jpeg',
          },
          caloBurned: 14,
          exerciseType: 'abs',
          isSystem: 'true',
        },
        {
          id: 3,
          name: 'Renegade row',
          description:
            'Bạn sẽ cần hai tạ tay cho cái này. Vào tư thế plank với tạ trên tay đỡ bạn. Nâng một cánh tay so với cơ thể của bạn, sao cho cẳng tay của bạn thẳng hàng với lưng và khuỷu tay của bạn ở góc 90 độ. Giữ trong 2 lần đếm, sau đó hạ lưng xuống để bắt đầu. Lặp lại trên cánh tay đối diện',
          imgLink: {
            uri:
              'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F12%2F2013%2F08%2Fimg_2085.jpeg',
          },
          caloBurned: 15,
          exerciseType: 'abs',
          isSystem: 'true',
        },
        {
          id: 4,
          name: 'Plank',
          description:
            'Vào tư thế plank, đặt tay ngay dưới vai, hóp cơ và lưng phẳng. Ngoài ra, bạn sẽ muốn đặt một chiếc khăn nhỏ dưới mỗi bàn chân. Trên sàn gỗ cứng hoặc vải sơn, kéo cơ thể của bạn từ bên này sang bên kia của căn phòng, kéo trọng lượng cơ thể của bạn bằng cách sử dụng cánh tay của bạn để di chuyển xung quanh. Một chuyến đi qua phòng, cả ở đó và trở lại, được tính là một vòng. Lặp lại điều này ba lần.',
          imgLink: {
            uri:
              'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F12%2F2013%2F08%2Fimg_2055.jpeg',
          },
          caloBurned: 12,
          exerciseType: 'abs',
          isSystem: 'true',
        },
        {
          id: 5,
          name: 'Squat to press',
          description:
            'Lấy hai tạ tay nhẹ và đứng, hai chân rộng bằng vai, khuỷu tay cong 90 độ và lòng bàn tay hướng về phía trước. Vào tư thế ngồi xổm và giữ trong hai giây. Tiếp theo, đẩy qua gót chân để đứng thẳng trong khi nâng tạ về phía trần nhà.',
          imgLink: {
            uri:
              'https://www.muscleandfitness.com/wp-content/uploads/2018/02/FrontSquatPress-MU.jpg?quality=86&strip=all',
          },
          caloBurned: 15,
          exerciseType: 'abs',
          isSystem: 'false',
        },
      ],
    };
  }
 componentDidMount(){
getExerciseTypes().then(data=>{
 
})
 }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Luyện tập</Text>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={{
              width: '90%',
              height: 100,
              fontSize: 20,
              fontFamily: 'Roboto-Bold',
              paddingLeft: 20,
            }}></TextInput>
          <TouchableOpacity>
            <Icon name="search" size={28}></Icon>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          style={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
          data={this.state.type}
          renderItem={({item}) => (
            <ExerciseWrap
              exerciseType={item}
              data={this.state.absExcs}></ExerciseWrap>
          )}
          keyExtractor={(item, index) => {
            return item.id.toString();
          }}></FlatList>
      </View>
=======
      workouts: [],
      schedules: [],
    };
  }

  loadSchedules = () => {
    let tempScheduleArr = [];
    getSchedulesbyUser ()
      .then (res => {
        res.forEach (doc => {
          let schObj = {scheduleType: doc.data ().scheduleType};
          schObj.schID = doc.id;
          tempScheduleArr.push (schObj);
        });

        //console.log('schedule id array list', tempScheduleArr);
        this.setState ({schedules: tempScheduleArr});
      })
      .catch (err => {
        console.log (err);
      });
  };

  loadExerciseTypes = () => {
    let tempTypeArr = [];

    getExerciseTypes ()
      .then (data => {
        data.forEach (doc => {
          let tempObj = doc.data ();
          tempObj.id = doc.id;
          tempTypeArr.push (tempObj);
        });

        // console.log(tempTypeArr);
        this.setState ({
          exerciseTypes: tempTypeArr,
        });
        return;
      })
      .catch (err => {
        console.log (err);
        return err;
      });
  };

  loadExercises = () => {
    let tempExerciseArr = [];
    getExercisesbyCurrentUser ()
      .then (data => {
        data.forEach (doc => {
          let exercise = doc.data ();
          exercise.id = doc.id;
          tempExerciseArr.push (exercise);
        });
      })
      .catch (err => console.log (err));
    getDefaultExercises ()
      .then (data => {
        data.forEach (doc => {
          let exercise = doc.data ();
          exercise.id = doc.id;
          tempExerciseArr.push (exercise);
        });
        this.setState ({workouts: tempExerciseArr});

        // console.log(tempExerciseArr);og
      })
      .catch (err => console.log (err));
  };

  componentDidMount () {
    //this.setState({isLoading: true});
    this.loadExercises ();
    this.loadExerciseTypes ();
    this.loadSchedules ();
  }
  reload = () => {
    this.setState ({
      exerciseTypes: [],
      workouts: [],
      schedules: [],
    });

    this.loadExercises ();
    this.loadExerciseTypes ();
    this.loadSchedules ();
  };
  render () {
    console.log (
      this.state.workouts.length,
      this.state.schedules.length,
      this.state.exerciseTypes.length
>>>>>>> 86d65a33621de1ff6f1d3d94f6bba38d66d8ec17
    );
    if (
      this.state.workouts.length === 0 ||
      this.state.schedules.length === 0 ||
      this.state.exerciseTypes.length === 0
    ) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#1CA2BB" />
        </View>
      );
    } else
      // console.log(this.state.exerciseTypes[2]);
      return (
        <View style={styles.container}>
          <Text style={styles.headerTitle}>Luyện tập</Text>
          <FlatList
            contentContainerStyle={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            style={styles.flatListContainer}
            showsVerticalScrollIndicator={false}
            data={this.state.exerciseTypes}
            renderItem={({item}) => (
              <ExerciseWrap
                exerciseType={item}
                data={this.state.workouts.length > 0 ? this.state.workouts : []}
                reloadAll={() => {
                  this.reload ();
                  console.log ('child calls reload');
                }}
                schedules={this.state.schedules}
              />
            )}
            keyExtractor={(item, index) => {
              return index.toString ();
            }}
          />
        </View>
      );
  }
}

class ExerciseWrap extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      addNewModalVisible: false,
      data: [],
    };
  }
  onToggleAddNewModal = () => {
    this.setState ({addNewModalVisible: !this.state.addNewModalVisible});
  };
  getNewId () {
    const num = this.state.data.length;
    return this.state.data[num - 1].id + 1;
  }
  addNewExercise = exercise => {
    if (
      exercise.exerciseName === '' ||
      exercise.exerciseDescription === '' ||
      exercise.exerciseCalories === 0
    ) {
      Alert.alert ('Chưa đủ thông tin', '', [
        {
          text: 'OK',
          onPress: () => {
            return;
          },
        },
      ]);
    } else {
      addExercise (exercise)
        .then (res => {
          console.log (res);
        })
        .catch (err => {
          console.log (err);
        });
      this.props.reloadAll ();
      this.onToggleAddNewModal ();
    }
  };
  deleteExercise = exercise => {
    var newData = this.state.data;
    Alert.alert ('Xóa bài tập', 'Bạn muốn xóa bài tập này ?', [
      {
        text: 'Hủy',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Xóa',
        onPress: () => {
          deleteExercise (exercise.id)
            .then (res => {
              console.log (res);
              this.props.reloadAll ();
            })
            .catch (err => {
              console.log (err);
            });
        },
      },
    ]);
  };
  componentDidMount () {
    const {data, exerciseType} = this.props;
    let workouts = [];
    data.forEach (item => {
      if (item.exerciseType === exerciseType.exerciseTypeName) {
        workouts.push (item);
      }
    });
    this.setState ({data: workouts});
  }
  render () {
    const {exerciseType} = this.props;
    let dataIconType = AbsIcon;
    switch (exerciseType.exerciseTypeName) {
      case 'Abs':
        dataIconType = AbsIcon;
        break;
      case 'Chest':
        dataIconType = ChestIcon;
        break;
      case 'Tricep':
        dataIconType = TricepIcon;
        break;
      case 'Shoulder':
        dataIconType = ShoulderIcon;
        break;
      case 'Back':
        dataIconType = BackIcon;
        break;
      case 'Bicep':
        dataIconType = BicepIcon;
        break;
      case 'Leg':
        dataIconType = LegIcon;
        break;
      default:
        dataIconType = LegIcon;
        break;
    }
    let newExercise = {
      exerciseName: '',
      exerciseDescription: '',
      exerciseImage: {
        uri: '',
      },
      exerciseCalories: 0,
      exerciseType: exerciseType.exerciseTypeName,
      isSystem: 'false',
      exerciseOwner: auth ().currentUser.uid,
    };
    return (
      <View style={styles.exerciseWrap}>
        <Image
          source={dataIconType}
          style={{marginLeft: '3%', width: 60, height: 60}}
        />
        <View style={styles.exerciseWrapInside}>
          <View style={styles.addNewExerciseButton}>
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={this.onToggleAddNewModal}
            >
              <Icon name="add" size={40} />
              <Text style={styles.exerciseTitle}>Thêm mới</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            style={styles.flatListStyle}
            showsHorizontalScrollIndicator={false}
            data={this.state.data.length > 0 ? this.state.data : []}
            renderItem={({item}) => (
              <Exercise
                schedules={this.props.schedules}
                exercise={item}
                delete={exercise => this.deleteExercise (exercise)}
              />
            )}
            keyExtractor={(item, index) => {
              return index.toString ();
            }}
          />
          <View style={styles.addNewModalContainer}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.addNewModalVisible}
            >
              <View style={styles.addNewModalView}>
                <Text style={styles.addExerciseTitle}>Thêm bài tập mới</Text>
                <View>
                  <View style={styles.rowStyleContainer}>
                    <Text style={styles.textInside}>Tên bài tập</Text>
                    <TextInput
                      onChangeText={text => {
                        newExercise.exerciseName = text;
                      }}
                      style={{
                        fontSize: 23,
                        fontFamily: 'Roboto-Regular',
                        width: '80%',
                        marginLeft: '3%',
                        borderBottomWidth: 2,
                        borderBottomColor: 'black',
                      }}
                    />
                  </View>
                  <View style={styles.rowStyleContainer}>
                    <Text style={styles.textInside}>Mô tả</Text>
                    <TextInput
                      onChangeText={text => {
                        newExercise.exerciseDescription = text;
                      }}
                      style={{
                        fontSize: 23,
                        fontFamily: 'Roboto-Regular',
                        width: '80%',
                        marginLeft: '3%',
                        borderBottomWidth: 2,
                        borderBottomColor: 'black',
                      }}
                      multiline={true}
                      numberOfLines={7}
                    />
                  </View>
                  <View style={styles.rowStyleContainer}>
                    <Text style={styles.textInside}>Calo/phút</Text>
                    <TextInput
                      onChangeText={text => {
                        newExercise.exerciseCalories = parseInt (text);
                      }}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 23,
                        fontFamily: 'Roboto-Regular',
                        width: '80%',
                        marginLeft: '3%',
                        borderBottomWidth: 2,
                        borderBottomColor: 'black',
                      }}
                    />
                  </View>
                  <View style={styles.rowStyleContainer}>
                    <Text style={styles.textInside}>Kiểu bài tập</Text>
                    <Image
                      source={dataIconType}
                      style={{marginLeft: '3%', width: 40, height: 40}}
                    />
                    <Text style={styles.textInside}>
                      ({exerciseType.exerciseTypeName})
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Pressable
                    style={{
                      width: '40%',
                      height: '40%',
                      borderRadius: 25,
                      backgroundColor: '#FFA693',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '5%',
                    }}
                    onPress={() => {
                      this.onToggleAddNewModal ();
                    }}
                  >
                    <Text style={{fontSize: 25, fontFamily: 'Roboto-Bold'}}>
                      Hủy
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      width: '40%',
                      height: '40%',
                      borderRadius: 25,
                      backgroundColor: '#C8FFFF',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      this.addNewExercise (newExercise);
                    }}
                  >
                    <Text style={{fontSize: 25, fontFamily: 'Roboto-Bold'}}>
                      OK
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    );
  }
}
class Exercise extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      infoModalVisible: false,
      addModalVisible: false,
      daysOfWeek: [],
      addtoSchedule: [
        {
          schID: '',
          exercise: {},
          rep: 0,
          set: 0,
          isChecked: false,
        },
        {schID: '', exercise: {}, rep: 0, set: 0, isChecked: false},
        {schID: '', exercise: {}, rep: 0, set: 0, isChecked: false},
        {schID: '', exercise: {}, rep: 0, set: 0, isChecked: false},
        {schID: '', exercise: {}, rep: 0, set: 0, isChecked: false},
        {schID: '', exercise: {}, rep: 0, set: 0, isChecked: false},
        {schID: '', exercise: {}, rep: 0, set: 0, isChecked: false},
        {schID: '', exercise: {}, rep: 0, set: 0, isChecked: false},
      ],
    };
  }

  componentDidMount () {
    const schedules = this.props.schedules;
    this.setState ({daysOfWeek: schedules});
    const {exercise} = this.props;
    let tempAddToSchedule = this.state.addtoSchedule;
    for (var i = 0; i < 7; i++) {
      //tempAddToSchedule[i].schID = this.state.daysOfWeek[i].schID;
      tempAddToSchedule[i].exercise = exercise;
    }
    this.setState ({
      addtoSchedule: tempAddToSchedule,
    });
    // console.log(this.state.addtoSchedule);
  }
  onToggleInfoModal = () => {
    this.setState ({infoModalVisible: !this.state.infoModalVisible});
  };
  onToggleAddModal = () => {
    this.setState ({addModalVisible: !this.state.addModalVisible});
  };
  addToWorkoutSchedule = exercise => {};

  render () {
    const {exercise} = this.props;
    let newExercise = {};
    return (
      <View style={styles.exerciseContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            height: '25%',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.delete (exercise);
            }}
          >
            <Image
              source={DeleteIcon}
              style={{
                width: exercise.isSystem == true ? 0 : 40,
                height: exercise.isSystem == true ? 0 : 40,
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.exerciseTitle}>{exercise.exerciseName}</Text>
        <Text style={styles.exerciseCalo}>
          {exercise.exerciseCalories} calo mỗi phút
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            height: '25%',
          }}
        >
          <TouchableOpacity onPress={this.onToggleInfoModal}>
            <Image
              source={InfoIcon}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onToggleAddModal}>
            <Image
              source={AddIcon}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infoModalContainer}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.infoModalVisible}
          >
            <View style={styles.infoModalView}>
              <Text style={styles.infoExerciseTitle}>
                {exercise.exerciseName}
              </Text>
              <ScrollView style={{height: '30%'}}>
                <Text style={styles.infoExerciseDescription}>
                  {exercise.exerciseDescription}
                </Text>
              </ScrollView>
              <Image
                source={
                  exercise.exerciseImage.uri ? exercise.exerciseImage : TapLuyen
                }
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
                onPress={this.onToggleInfoModal}
              >
                <Text style={{fontSize: 25, fontFamily: 'Roboto-Bold'}}>
                  OK
                </Text>
              </Pressable>
            </View>
          </Modal>
        </View>
        <View style={styles.addModalContainer}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.addModalVisible}
          >
            <View style={styles.addModalView}>
              <Text style={styles.addExerciseTitle}>Thêm vào lịch tập</Text>
              <FlatList
                data={this.state.daysOfWeek}
                renderItem={({item}) => (
                  <AddToDayContainer day={item} exercise={exercise} />
                )}
                keyExtractor={item => {
                  return item.schID.toString ();
                }}
              />

              <TextInput
                placeholder={'Số set'}
                onChangeText={text => {
                  newExercise.exerciseName = text;
                }}
                maxLength={2}
                style={{
                  fontSize: 23,
                  fontFamily: 'Roboto-Regular',
                  width: '50%',
                  marginLeft: '3%',
                  borderBottomWidth: 2,
                  borderBottomColor: 'black',
                }}
              />
              <TextInput
                placeholder={'Số rep'}
                onChangeText={text => {
                  newExercise.exerciseName = text;
                }}
                maxLength={2}
                style={{
                  fontSize: 23,
                  fontFamily: 'Roboto-Regular',
                  width: '50%',
                  marginLeft: '3%',
                  borderBottomWidth: 2,
                  borderBottomColor: 'black',
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
                onPress={this.onToggleAddModal}
              >
                <Text style={{fontSize: 25, fontFamily: 'Roboto-Bold'}}>
                  OK
                </Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}
function AddToDayContainer (params) {
  const [isChecked, setIsChecked] = useState (false);
  return (
    <View style={styles.addToDayContainer}>
      <Text style={styles.addExerciseTitle}>
        {capitalizeFirstLetter (params.day.scheduleType)}
      </Text>
      <CheckBox
        checked={isChecked}
        size={40}
        onPress={() => setIsChecked (!isChecked)}
      />
    </View>
  );
}
function capitalizeFirstLetter (string) {
  return string.charAt (0).toUpperCase () + string.slice (1);
}

const styles = StyleSheet.create ({
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
  searchBarContainer: {
    width: '90%',
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: 'white',
    padding: 10,
    marginTop: 20,
  },
  flatListStyle: {
    width: '80%',
    height: '100%',
  },
  exerciseWrap: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: '10%',
    width: '100%',
    height: 250,
  },
  exerciseWrapInside: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: '2%',
    marginHorizontal: '3%',
    height: '100%',
  },
  exerciseContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    marginHorizontal: 10,
    width: 150,
    height: '100%',
  },

  addNewExerciseButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 3,
    marginRight: '0%',
    width: '30%',
    height: '100%',
  },
  exerciseTitle: {
    fontSize: 23,
    fontFamily: 'Roboto-Bold',
    width: '100%',
    height: '35%',
    textAlign: 'center',
  },
  exerciseCalo: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
  textInside: {
    fontSize: 23,
    fontFamily: 'Roboto-Bold',
  },
  flatListContainer: {
    marginTop: '3%',
    width: '90%',
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
  infoExerciseDescription: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
  },
  addModalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '90%',
  },
  addExerciseTitle: {fontSize: 30, fontFamily: 'Roboto-Bold'},
  addExerciseDescription: {fontSize: 20, fontFamily: 'Roboto-Regular'},
  addToDayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: '2%',
  },
  dayOfWeekTitle: {
    fontSize: 35,
    fontFamily: 'Roboto-Bold',
  },
  addNewModalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNewModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '90%',
  },
  rowStyleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
});

export default Workout;
