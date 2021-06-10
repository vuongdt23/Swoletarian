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
import auth from '@react-native-firebase/auth';
import {
  getExerciseTypes,
  getExercisesbyCurrentUser,
  addExercise,
  deleteExercise,
} from '../../Firebase/ExerciseAPI';
class Workout extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      loading: true,
      exerciseTypes: [],
      exercises: [],
      workouts: [],
    };
  }

  componentDidMount () {
    let tempArr = [];
    let tempExerciseArr = [];
    getExerciseTypes ()
      .then (data => {
        data.forEach (doc => {
          let tempObj = doc.data ();
          tempObj.id = doc.id;
          tempArr.push (tempObj);
        });

        //console.log(tempArr);
        this.setState ({
          exerciseTypes: tempArr,
        });
      })
      .catch (err => {
        console.log (err);
      });
    getExercisesbyCurrentUser ()
      .then (data => {
        data.forEach (doc => {
          let exercise = doc.data ();
          exercise.id = doc.id;
          tempExerciseArr.push (exercise);
        });
        this.setState ({workouts: tempExerciseArr});
        console.log (tempExerciseArr);

        this.setState ({loading: false});
      })
      .catch (err => console.log (err));
  }
  reload = () => {
    this.setState ({loading: true});
    let tempArr = [];
    let tempExerciseArr = [];
    getExerciseTypes ()
      .then (data => {
        data.forEach (doc => {
          let tempObj = doc.data ();
          tempObj.id = doc.id;
          tempArr.push (tempObj);
        });

        //console.log(tempArr);
        this.setState ({
          exerciseTypes: tempArr,
        });
      })
      .catch (err => {
        console.log (err);
      });
    getExercisesbyCurrentUser ()
      .then (data => {
        data.forEach (doc => {
          let exercise = doc.data ();
          exercise.id = doc.id;
          tempExerciseArr.push (exercise);
        });
        this.setState ({workouts: tempExerciseArr});
        console.log (tempExerciseArr);

        this.setState ({loading: false});
      })
      .catch (err => console.log (err));

    console.log ('reload');
  };
  render () {
    if (this.state.loading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#1CA2BB" />
        </View>
      );
    // console.log(this.state.exerciseTypes[2]);
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
            }}
          />
          <TouchableOpacity>
            <Icon name="search" size={28} />
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
          data={this.state.exerciseTypes}
          renderItem={({item}) => (
            <ExerciseWrap
              exerciseType={item}
              data={this.state.workouts.length > 0 ? this.state.workouts : []}
              reloadAll={() => {
                this.reload ();
                console.log ('child calls reload');
              }}
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
      if (item.exerciseType === exerciseType.exerciseTypeName)
        workouts.push (item);
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
      daysOfWeek: [
        {id: 2, name: 'Monday'},
        {id: 3, name: 'Tuesday'},
        {id: 4, name: 'Wednesday'},
        {id: 5, name: 'Thursday'},
        {id: 6, name: 'Friday'},
        {id: 7, name: 'Saturday'},
      ],
    };
  }

  onToggleInfoModal = () => {
    this.setState ({infoModalVisible: !this.state.infoModalVisible});
  };
  onToggleAddModal = () => {
    this.setState ({addModalVisible: !this.state.addModalVisible});
  };
  AddToDayContainer = params => {
    const [isChecked, setIsChecked] = useState (false);
    return (
      <View style={styles.addToDayContainer}>
        <Text style={styles.addExerciseTitle}>{params.day.name}</Text>
        <CheckBox
          checked={isChecked}
          size={40}
          onPress={() => setIsChecked (!isChecked)}
        />
      </View>
    );
  };
  render () {
    const {exercise} = this.props;
    return (
      <View style={styles.exerciseContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 30,
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
                width: exercise.isSystem == 'true' ? 0 : 40,
                height: exercise.isSystem == 'true' ? 0 : 40,
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.exerciseTitle}>{exercise.name}</Text>
        <Text style={styles.exerciseCalo}>
          {exercise.exerciseCalories} calo mỗi phút
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginBottom: 30,
            width: '100%',
            height: '25%',
            marginTop: 30,
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
              <Text style={styles.infoExerciseTitle}>{exercise.name}</Text>
              <Text style={styles.infoExerciseDescription}>
                {exercise.exerciseDescription}
              </Text>
              <Image
                source={exercise.exerciseImage}
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
                  <this.AddToDayContainer day={item} exercise={exercise} />
                )}
                keyExtractor={item => {
                  return item.id.toString ();
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    marginHorizontal: 10,
    width: '50%',
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
  infoExerciseDescription: {fontSize: 20, fontFamily: 'Roboto-Regular'},
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
