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

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daysOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      currentDayWorkouts: [],
      currentDayName: '',
      Monday: [
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
          reps: 30,
          sets: 3,
        },
        {
          id: 2,
          name: 'Renegade row',
          description:
            'Vào tư thế plank, đặt tay ngay dưới vai, hóp cơ và lưng phẳng. Ngoài ra, bạn sẽ muốn đặt một chiếc khăn nhỏ dưới mỗi bàn chân. Trên sàn gỗ cứng hoặc vải sơn, kéo cơ thể của bạn từ bên này sang bên kia của căn phòng, kéo trọng lượng cơ thể của bạn bằng cách sử dụng cánh tay của bạn để di chuyển xung quanh. Một chuyến đi qua phòng, cả ở đó và trở lại, được tính là một vòng. Lặp lại điều này ba lần.',
          imgLink: {
            uri:
              'https://wheyshop.vn/wp-content/uploads/2017/07/maxresdefault.jpg',
          },
          caloBurned: 12,
          exerciseType: 'abs',
          isSystem: 'false',
          reps: 20,
          sets: 3,
        },
        {
          id: 3,
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
          reps: 20,
          sets: 2,
        },
        {
          id: 4,
          name: 'Squat to press',
          description:
            'Vào tư thế plank, đặt tay ngay dưới vai, hóp cơ và lưng phẳng. Ngoài ra, bạn sẽ muốn đặt một chiếc khăn nhỏ dưới mỗi bàn chân. Trên sàn gỗ cứng hoặc vải sơn, kéo cơ thể của bạn từ bên này sang bên kia của căn phòng, kéo trọng lượng cơ thể của bạn bằng cách sử dụng cánh tay của bạn để di chuyển xung quanh. Một chuyến đi qua phòng, cả ở đó và trở lại, được tính là một vòng. Lặp lại điều này ba lần.',
          imgLink: {
            uri:
              'https://wheyshop.vn/wp-content/uploads/2017/07/maxresdefault.jpg',
          },
          caloBurned: 12,
          exerciseType: 'shoulder',
          isSystem: 'false',
          reps: 20,
          sets: 3,
        },
        {
          id: 5,
          name: 'Plank',
          description:
            'Vào tư thế plank, đặt tay ngay dưới vai, hóp cơ và lưng phẳng. Ngoài ra, bạn sẽ muốn đặt một chiếc khăn nhỏ dưới mỗi bàn chân. Trên sàn gỗ cứng hoặc vải sơn, kéo cơ thể của bạn từ bên này sang bên kia của căn phòng, kéo trọng lượng cơ thể của bạn bằng cách sử dụng cánh tay của bạn để di chuyển xung quanh. Một chuyến đi qua phòng, cả ở đó và trở lại, được tính là một vòng. Lặp lại điều này ba lần.',
          imgLink: {
            uri:
              'https://wheyshop.vn/wp-content/uploads/2017/07/maxresdefault.jpg',
          },
          caloBurned: 12,
          exerciseType: 'shoulder',
          isSystem: 'false',
          reps: 20,
          sets: 2,
        },
        {
          id: 6,
          name: 'Plank',
          description:
            'Vào tư thế plank, đặt tay ngay dưới vai, hóp cơ và lưng phẳng. Ngoài ra, bạn sẽ muốn đặt một chiếc khăn nhỏ dưới mỗi bàn chân. Trên sàn gỗ cứng hoặc vải sơn, kéo cơ thể của bạn từ bên này sang bên kia của căn phòng, kéo trọng lượng cơ thể của bạn bằng cách sử dụng cánh tay của bạn để di chuyển xung quanh. Một chuyến đi qua phòng, cả ở đó và trở lại, được tính là một vòng. Lặp lại điều này ba lần.',
          imgLink: {
            uri:
              'https://wheyshop.vn/wp-content/uploads/2017/07/maxresdefault.jpg',
          },
          caloBurned: 12,
          exerciseType: 'tricep',
          isSystem: 'false',
          reps: 20,
          sets: 5,
        },
        {
          id: 7,
          name: 'Plank',
          description:
            'Vào tư thế plank, đặt tay ngay dưới vai, hóp cơ và lưng phẳng. Ngoài ra, bạn sẽ muốn đặt một chiếc khăn nhỏ dưới mỗi bàn chân. Trên sàn gỗ cứng hoặc vải sơn, kéo cơ thể của bạn từ bên này sang bên kia của căn phòng, kéo trọng lượng cơ thể của bạn bằng cách sử dụng cánh tay của bạn để di chuyển xung quanh. Một chuyến đi qua phòng, cả ở đó và trở lại, được tính là một vòng. Lặp lại điều này ba lần.',
          imgLink: {
            uri:
              'https://wheyshop.vn/wp-content/uploads/2017/07/maxresdefault.jpg',
          },
          caloBurned: 12,
          exerciseType: 'tricep',
          isSystem: 'false',
          reps: 20,
          sets: 3,
        },
        {
          id: 8,
          name: 'Plank',
          description:
            'Vào tư thế plank, đặt tay ngay dưới vai, hóp cơ và lưng phẳng. Ngoài ra, bạn sẽ muốn đặt một chiếc khăn nhỏ dưới mỗi bàn chân. Trên sàn gỗ cứng hoặc vải sơn, kéo cơ thể của bạn từ bên này sang bên kia của căn phòng, kéo trọng lượng cơ thể của bạn bằng cách sử dụng cánh tay của bạn để di chuyển xung quanh. Một chuyến đi qua phòng, cả ở đó và trở lại, được tính là một vòng. Lặp lại điều này ba lần.',
          imgLink: {
            uri:
              'https://wheyshop.vn/wp-content/uploads/2017/07/maxresdefault.jpg',
          },
          caloBurned: 12,
          exerciseType: 'shoulder',
          isSystem: 'false',
          reps: 20,
          sets: 2,
        },
        {
          id: 9,
          name: 'Plank',
          description:
            'Vào tư thế plank, đặt tay ngay dưới vai, hóp cơ và lưng phẳng. Ngoài ra, bạn sẽ muốn đặt một chiếc khăn nhỏ dưới mỗi bàn chân. Trên sàn gỗ cứng hoặc vải sơn, kéo cơ thể của bạn từ bên này sang bên kia của căn phòng, kéo trọng lượng cơ thể của bạn bằng cách sử dụng cánh tay của bạn để di chuyển xung quanh. Một chuyến đi qua phòng, cả ở đó và trở lại, được tính là một vòng. Lặp lại điều này ba lần.',
          imgLink: {
            uri:
              'https://wheyshop.vn/wp-content/uploads/2017/07/maxresdefault.jpg',
          },
          caloBurned: 12,
          exerciseType: 'tricep',
          isSystem: 'false',
          reps: 20,
          sets: 5,
        },
        {
          id: 10,
          name: 'Plank',
          description:
            'Vào tư thế plank, đặt tay ngay dưới vai, hóp cơ và lưng phẳng. Ngoài ra, bạn sẽ muốn đặt một chiếc khăn nhỏ dưới mỗi bàn chân. Trên sàn gỗ cứng hoặc vải sơn, kéo cơ thể của bạn từ bên này sang bên kia của căn phòng, kéo trọng lượng cơ thể của bạn bằng cách sử dụng cánh tay của bạn để di chuyển xung quanh. Một chuyến đi qua phòng, cả ở đó và trở lại, được tính là một vòng. Lặp lại điều này ba lần.',
          imgLink: {
            uri:
              'https://wheyshop.vn/wp-content/uploads/2017/07/maxresdefault.jpg',
          },
          caloBurned: 12,
          exerciseType: 'tricep',
          isSystem: 'false',
          reps: 20,
          sets: 3,
        },
      ],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    };
  }
  setDayOfWeek = day => {
    this.setState({currentDayName: day});
    switch (day) {
      case 'Monday':
        this.setState({currentDayWorkouts: this.state.Monday});
        break;
      case 'Tuesday':
        this.setState({currentDayWorkouts: this.state.Tuesday});
        break;
      case 'Wednesday':
        this.setState({currentDayWorkouts: this.state.Wednesday});
        break;
      case 'Thursday':
        this.setState({currentDayWorkouts: this.state.Thursday});
        break;
      case 'Friday':
        this.setState({currentDayWorkouts: this.state.Friday});
        break;
      case 'Saturday':
        this.setState({currentDayWorkouts: this.state.Saturday});
        break;
    }
  };
  deleteCurrentSchedule = () => {
    Alert.alert('Xóa lịch tập luyện', 'Bạn muốn xóa lịch tập luyện hiện tại?', [
      {
        text: 'Hủy',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Xóa',
        onPress: () => {
          this.setState({currentDayWorkouts: []});
          this.setState({Monday: []});
          this.setState({Tuesday: []});
          this.setState({Wednesday: []});
          this.setState({Thursday: []});
          this.setState({Friday: []});
          this.setState({Saturday: []});
          this.setState({currentDayName: ''});
        },
      },
    ]);
  };
  deleteExercise = exercise => {
    var newData = this.state.currentDayWorkouts;
    Alert.alert(
      'Xóa bài tập',
      'Bạn muốn xóa ' +
        exercise.name +
        ' khỏi ' +
        this.state.currentDayName +
        '?',
      [
        {
          text: 'Hủy',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => {
            newData.map((element, index) => {
              if (element.id == exercise.id) newData.splice(index, 1);
            });
            this.setState({currentDayWorkouts: newData});
            switch (this.state.currentDayName) {
              case 'Monday':
                this.setState({Monday: newData});
                break;
              case 'Tuesday':
                this.setState({Tuesday: newData});
                break;
              case 'Wednesday':
                this.setState({Wednesday: newData});
                break;
              case 'Thursday':
                this.setState({Thursday: newData});
                break;
              case 'Friday':
                this.setState({Friday: newData});
                break;
              case 'Saturday':
                this.setState({Saturday: newData});
                break;
            }
          },
        },
      ],
    );
  };
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
              return item.id.toString();
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
        <Text style={styles.exerciseTitle}>{data.name}</Text>
        <View style={styles.repSetContainer}>
          <View style={styles.setsContainer}>
            <Text style={styles.repsContentStyle}>{data.sets} sets</Text>
          </View>
          <View style={styles.repsContainer}>
            <Text style={styles.repsContentStyle}>{data.reps} reps</Text>
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
              <Text style={styles.infoExerciseTitle}>{data.name}</Text>
              <Text style={styles.infoExerciseDescription}>
                {data.description}
              </Text>
              <Image
                source={data.imgLink}
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
      placeholder={'...'}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFDD93',
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
