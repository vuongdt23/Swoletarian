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
  ScrollView,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import {FlatList} from 'react-native-gesture-handler';
import AbsIcon from '../../assets/Icon/workout/AbsIcon.png';
import BackIcon from '../../assets/Icon/workout/BackIcon.png';
import ChestIcon from '../../assets/Icon/workout/ChestIcon.png';
import TricepIcon from '../../assets/Icon/workout/TricepIcon.png';
import ShoulderIcon from '../../assets/Icon/workout/ShoulderIcon.png';
import BicepIcon from '../../assets/Icon/workout/BicepIcon.png';
import LegIcon from '../../assets/Icon/workout/LegIcon.png';
class Today extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDisplayValue: '',
      currentDayWorkouts: [
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
      currentTotalCalosBurned: 0,
      currentDayNutrions: [
        {
          id: 1,
          mealName: 'Buổi sáng',
          nutrions: [
            {
              id: 1,
              name: 'Gạo nếp',
              calo: 130,
              isSystem: 'true',
              grams: 300,
            },
            {
              id: 2,
              name: 'Bơ đậu',
              calo: 580,
              isSystem: 'true',
              grams: 300,
            },
            {
              id: 3,
              name: 'Thịt bò',
              calo: 278,
              isSystem: 'true',
              grams: 100,
            },
            {
              id: 4,
              name: 'Khoai tây',
              calo: 90,
              isSystem: 'true',
              grams: 200,
            },
            {
              id: 5,
              name: 'Bơ đậu',
              calo: 580,
              isSystem: 'true',
              grams: 300,
            },
            {
              id: 6,
              name: 'Thịt bò',
              calo: 278,
              isSystem: 'true',
              grams: 100,
            },
            {
              id: 7,
              name: 'Khoai tây',
              calo: 90,
              isSystem: 'true',
              grams: 200,
            },
          ],
        },
        {
          id: 2,
          mealName: 'Lunch',
          nutrions: [
            {
              id: 1,
              name: 'Gạo nếp',
              calo: 130,
              isSystem: 'true',
              grams: 300,
            },
            {
              id: 2,
              name: 'Bơ đậu',
              calo: 580,
              isSystem: 'true',
              grams: 300,
            },
            {
              id: 3,
              name: 'Thịt bò',
              calo: 278,
              isSystem: 'true',
              grams: 100,
            },
            {
              id: 4,
              name: 'Khoai tây',
              calo: 90,
              isSystem: 'true',
              grams: 200,
            },
            {
              id: 5,
              name: 'Bơ đậu',
              calo: 580,
              isSystem: 'true',
              grams: 300,
            },
            {
              id: 6,
              name: 'Thịt bò',
              calo: 278,
              isSystem: 'true',
              grams: 100,
            },
            {
              id: 7,
              name: 'Khoai tây',
              calo: 90,
              isSystem: 'true',
              grams: 200,
            },
          ],
        },
        {
          id: 3,
          mealName: 'Dinner',
          nutrions: [
            {
              id: 1,
              name: 'Gạo nếp',
              calo: 130,
              isSystem: 'true',
              grams: 300,
            },
            {
              id: 2,
              name: 'Bơ đậu',
              calo: 580,
              isSystem: 'true',
              grams: 300,
            },
            {
              id: 3,
              name: 'Thịt bò',
              calo: 278,
              isSystem: 'true',
              grams: 100,
            },
            {
              id: 4,
              name: 'Khoai tây',
              calo: 90,
              isSystem: 'true',
              grams: 200,
            },
            {
              id: 5,
              name: 'Bơ đậu',
              calo: 580,
              isSystem: 'true',
              grams: 300,
            },
            {
              id: 6,
              name: 'Thịt bò',
              calo: 278,
              isSystem: 'true',
              grams: 100,
            },
            {
              id: 7,
              name: 'Khoai tây',
              calo: 90,
              isSystem: 'true',
              grams: 200,
            },
          ],
        },
        {
          id: 4,
          mealName: 'supMeal1',
          nutrions: [
            {
              id: 1,
              name: 'Gạo nếp',
              calo: 130,
              isSystem: 'true',
              grams: 300,
            },
            {
              id: 2,
              name: 'Bơ đậu',
              calo: 580,
              isSystem: 'true',
              grams: 300,
            },
          ],
        },
        {
          id: 5,
          mealName: 'supMeal2',
          nutrions: [
            {
              id: 1,
              name: 'Gạo nếp',
              calo: 130,
              isSystem: 'true',
              grams: 300,
            },
            {
              id: 2,
              name: 'Bơ đậu',
              calo: 580,
              isSystem: 'true',
              grams: 300,
            },
          ],
        },
        {
          id: 6,
          mealName: 'supMeal3',
          nutrions: [
            {
              id: 1,
              name: 'Gạo nếp',
              calo: 130,
              isSystem: 'true',
              grams: 300,
            },
            {
              id: 2,
              name: 'Bơ đậu',
              calo: 580,
              isSystem: 'true',
              grams: 300,
            },
          ],
        },
      ],
      currentTotalCalosGained: 0,
      isCompleteWorkouts: false,
      isCompleteNutrions: false,
    };
  }
  handleWorkoutChecked = (totalCalosBurned, isChecked) => {
    var newTotalCalosBurned = this.state.currentTotalCalosBurned;
    isChecked
      ? (newTotalCalosBurned = newTotalCalosBurned - totalCalosBurned)
      : (newTotalCalosBurned = newTotalCalosBurned + totalCalosBurned);
    this.setState({currentTotalCalosBurned: newTotalCalosBurned});
  };
  handleNutrionChecked = (totalCalosGained, isChecked) => {
    var newTotalCalosGained = this.state.currentTotalCalosGained;
    isChecked
      ? (newTotalCalosGained = newTotalCalosGained - totalCalosGained)
      : (newTotalCalosGained = newTotalCalosGained + totalCalosGained);
    this.setState({currentTotalCalosGained: newTotalCalosGained});
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
  resetCurrentCalosBurnedAndGained = () => {
    this.setState({currentTotalCalosBurned: 0});
    this.setState({currentTotalCalosGained: 0});
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
            this.setState({isCompleteNutrions: true});
          },
        },
      ],
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Hôm nay</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateContent}>{new Date().toDateString()}</Text>
        </View>
        <View>
          <DropDown
            callDropDownValue={value => {
              this.setState({currentDisplayValue: value});
              this.resetCurrentCalosBurnedAndGained();
            }}></DropDown>
        </View>
        <View style={styles.contentContainer}>
          {this.state.currentDisplayValue == 'Workout' ? (
            <View style={styles.insideContentContainer}>
              <FlatList
                numColumns={1}
                contentContainerStyle={{}}
                showsVerticalScrollIndicator={false}
                data={this.state.currentDayWorkouts}
                renderItem={({item}) => (
                  <Exercise
                    data={item}
                    handleWorkoutChecked={(totalCalosBurned, isChecked) => {
                      this.handleWorkoutChecked(totalCalosBurned, isChecked);
                    }}></Exercise>
                )}
                keyExtractor={(item, index) => {
                  return item.id.toString();
                }}></FlatList>
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
          ) : (
            <View style={styles.insideContentContainer}>
              <FlatList
                numColumns={1}
                contentContainerStyle={{}}
                showsVerticalScrollIndicator={true}
                data={this.state.currentDayNutrions}
                renderItem={({item}) => (
                  <NutrionWrap
                    data={item}
                    handleNutrionChecked={(totalCalosGained, isChecked) => {
                      this.handleNutrionChecked(totalCalosGained, isChecked);
                      console.log('Today: ' + totalCalosGained + isChecked);
                    }}></NutrionWrap>
                )}
                keyExtractor={(item, index) => {
                  return item.id.toString();
                }}></FlatList>
              <View style={styles.totalContainer}>
                <TouchableOpacity
                  disabled={this.state.isCompleteNutrions ? true : false}
                  style={styles.completeButton}
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
          )}
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
      (data.caloBurned * data.reps * data.sets) /
      60
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
        <CheckBox
          checked={this.state.isChecked}
          size={35}
          onPress={() => this.setIsChecked(!this.state.isChecked)}></CheckBox>
        <View style={styles.infoModalContainer}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.infoModalVisible}>
            <View style={styles.infoModalView}>
              <Text style={styles.infoExerciseTitle}>{data.name}</Text>
              <ScrollView style={{height: '30%'}}>
                <Text style={styles.infoExerciseDescription}>
                  {data.description}
                </Text>
              </ScrollView>
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

class NutrionWrap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }
  render() {
    const {data} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.nutrionWrapTitleContainer}>
          <Text style={styles.nutrionWrapTitle}>{data.mealName}</Text>
        </View>
        <FlatList
          numColumns={1}
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={true}
          data={data.nutrions}
          renderItem={({item}) => (
            <Nutrion
              data={item}
              handleNutrionChecked={(totalCalosGained, isChecked) => {
                this.props.handleNutrionChecked(totalCalosGained, isChecked);
                console.log(
                  'NutrionWrap: ' + totalCalosGained + isChecked.toString(),
                );
              }}></Nutrion>
          )}
          keyExtractor={(item, index) => {
            return item.id.toString();
          }}></FlatList>
      </View>
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
    console.log('Nutrion:1 ' + this.state.isChecked);
    const {data} = this.props;
    this.setState({isChecked: !this.state.isChecked});
    let calos = (data.calo * data.grams) / 100;
    this.props.handleNutrionChecked(calos, this.state.isChecked);
    console.log('Nutrion:2 ' + calos + this.state.isChecked.toString());
  };
  render() {
    const {data} = this.props;
    let calos = (data.calo * data.grams) / 100;
    return (
      <View style={styles.nutrionContainer}>
        <Text style={styles.nutrionTitle}>{data.name}</Text>
        <Text style={styles.caloTitle}>{data.calo} calos/100gram</Text>
        <View style={styles.calosContainer}>
          <Text style={styles.gramsTitle}>{data.grams} grams</Text>
          <Text style={styles.calosTitle}>{calos.toString()} calos</Text>
        </View>
        <CheckBox
          checked={this.state.isChecked}
          size={35}
          onPress={() => {
            this.setIsChecked();
          }}></CheckBox>
      </View>
    );
  }
}

function DropDown(props) {
  const itemsList = [
    {label: 'Luyện tập', value: 'Workout'},
    {label: 'Dinh dưỡng', value: 'Nutrion'},
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
    marginTop: '5%',
    height: '75%',
    width: '90%',
  },
  insideContentContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
    height: '15%',
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
