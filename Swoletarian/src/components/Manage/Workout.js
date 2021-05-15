import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {BackgroundImage} from 'react-native-elements/dist/config';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
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
const getCurrentDate = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  //Alert.alert(date + '-' + month + '-' + year);
  // You can turn it in to your desired format
  return date + '-' + month + '-' + year; //format: dd-mm-yyyy;
};
class Workout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
              'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F12%2F2013%2F08%2Fimg_2055.jpeg',
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
    );
  }
}

class ExerciseWrap extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {data, exerciseType} = this.props;
    let dataIconType = AbsIcon;
    switch (exerciseType.name) {
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
      <View style={styles.exerciseWrap}>
        <Image
          source={dataIconType}
          style={{marginLeft: '3%', width: 60, height: 60}}></Image>
        <View style={styles.exerciseWrapInside}>
          <View style={styles.addNewExerciseButton}>
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="add" size={40}></Icon>
              <Text style={styles.exerciseTitle}>Thêm mới</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            style={styles.flatListStyle}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({item}) => <Exercise exercise={item}></Exercise>}
            keyExtractor={(item, index) => {
              return item.id.toString();
            }}></FlatList>
        </View>
      </View>
    );
  }
}
class Exercise extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
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
          }}>
          <TouchableOpacity>
            <Image
              source={DeleteIcon}
              style={{
                width: exercise.isSystem == 'true' ? 0 : 40,
                height: exercise.isSystem == 'true' ? 0 : 40,
              }}></Image>
          </TouchableOpacity>
        </View>
        <Text style={styles.exerciseTitle}>{exercise.name}</Text>
        <Text style={styles.exerciseCalo}>
          {exercise.caloBurned} calo mỗi phút
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
          }}>
          <TouchableOpacity>
            <Image
              source={InfoIcon}
              style={{
                width: 40,
                height: 40,
              }}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={AddIcon}
              style={{
                width: 40,
                height: 40,
              }}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDD93',
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
    marginRight: '2%',
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
});

export default Workout;
