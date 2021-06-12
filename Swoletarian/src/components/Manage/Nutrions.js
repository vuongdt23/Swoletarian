import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Alert,
  Pressable,
  Button,
  ActivityIndicator,
} from 'react-native';
import {Input} from 'react-native-elements/dist/input/Input';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {
  getFoodsbyCurrentUser,
  addFood,
  deleteFood,
  getDefaultFoods,
} from '../../Firebase/foodAPI';
import Icon from 'react-native-vector-icons/Ionicons';

class Nutrions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      modalVisible: false,
      foods: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    let tempArray = [];

    getFoodsbyCurrentUser().then(data => {
      data.forEach(doc => {
        let food = doc.data();
        food.id = doc.id;
        tempArray.push(food);
      });
    });
    getDefaultFoods()
      .then(data => {
        data.forEach(doc => {
          let food = doc.data();
          food.id = doc.id;
          tempArray.push(food);
        });
        console.log(tempArray);
        this.setState({foods: tempArray, isLoading: false});
      })
      .catch(err => {
        console.log(err);
      });
  }
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  updateSearch = search => {
    this.setState({search});
  };
  closeAddForm() {
    this.setState({modalVisible: false});
  }
  addNewNutrion = newNutrion => {
    if (newNutrion.name == '' || newNutrion.calo == 0) {
      Alert.alert('Chưa đủ thông tin', '', [
        {
          text: 'OK',
          onPress: () => {
            return;
          },
        },
      ]);
    } else {
      addFood(newNutrion)
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
      console.log('new food added');
      this.componentDidMount();
      this.setState({modalVisible: false});
    }
  };
  deleteNutrion = Nutrion => {
    var newData = this.state.data;
    Alert.alert('Xóa thực phẩm', 'Bạn muốn xóa thực phẩm này ?', [
      {
        text: 'Hủy',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Xóa',
        onPress: () => {
          console.log(Nutrion.id);
          deleteFood(Nutrion.id.toString())
            .then(res => console.log('a', res))
            .catch(err => console.log('b', err));
          this.componentDidMount();
        },
      },
    ]);
  };
  getNewId() {
    const num = this.state.data.length;
    return this.state.data[num - 1].id + 1;
  }
  render() {
    const {search} = this.state;
    const {modalVisible} = this.state;
    let newNutrion = {
      foodName: '',
      foodCalories: 0,
      foodOwner: auth().currentUser.uid,
      isSystem: false,
    };
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}> Dinh Dưỡng</Text>
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

        <View style={styles.addNewContainer}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => this.setModalVisible(!modalVisible)}>
            <Icon name="add" size={40} />
            <Text style={{fontSize: 25, fontFamily: 'Roboto-Bold'}}>
              Thêm thực phẩm
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.isLoading ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#1CA2BB" />
          </View>
        ) : (
          <FlatList
            style={{width: '90%'}}
            showsVerticalScrollIndicator={false}
            data={this.state.foods}
            renderItem={({item}) => (
              <Nutrion
                detail={item}
                deleteNutrion={Nutrion => this.deleteNutrion(Nutrion)}
              />
            )}
            extraData={this.state.data}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
          />
        )}

        <View style={styles.modalContainer}>
          <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View style={styles.modalView}>
              <Text style={styles.headerTitle}>Thêm mới</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '70%',
                  margin: 10,
                }}>
                <Text style={{fontSize: 20, fontFamily: 'Roboto-Regular'}}>
                  Tên thực phẩm
                </Text>
                <Input
                  onChangeText={text => (newNutrion.foodName = text)}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '70%',
                  margin: 10,
                }}>
                <Text style={{fontSize: 20, fontFamily: 'Roboto-Regular'}}>
                  Calories/100gram
                </Text>
                <Input
                  onChangeText={text => (newNutrion.foodCalories = text)}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Pressable
                  style={{
                    width: '40%',
                    height: '45%',
                    borderRadius: 25,
                    backgroundColor: '#FFA693',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '5%',
                  }}
                  onPress={() => {
                    this.closeAddForm();
                  }}>
                  <Text style={{fontSize: 25, fontFamily: 'Roboto-Bold'}}>
                    Hủy
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    width: '40%',
                    height: '45%',
                    borderRadius: 25,
                    backgroundColor: '#C8FFFF',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.addNewNutrion(newNutrion)}>
                  <Text style={{fontSize: 25, fontFamily: 'Roboto-Bold'}}>
                    OK
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

function Nutrion(props) {
  let detail = props.detail;
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        width: '100%',
        height: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 30,
      }}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <Text style={{fontSize: 25, fontFamily: 'Roboto-Bold'}}>
          {detail.foodName}
        </Text>
        <Text style={{fontSize: 20, fontFamily: 'Roboto-Regular'}}>
          {detail.foodCalories} calo/100 gram{' '}
        </Text>
      </View>
      <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
        <TouchableOpacity>
          <Icon name="add-circle-outline" size={35} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.deleteNutrion(detail)}>
          <Icon
            name="close-circle-outline"
            size={detail.isSystem ? 0 : 35}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
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
  addNewContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '15%',
    marginVertical: 15,
  },
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    height: '60%',
    marginTop: '30%',
  },
});

export default Nutrions;
