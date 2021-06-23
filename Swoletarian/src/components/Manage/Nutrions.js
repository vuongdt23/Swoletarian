import React, {useState} from 'react';
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
import {
  getMenubyCurrentUser,
  uploadMenuDetails,
  deleteMenuDetailsByFoodID,
} from '../../Firebase/MenuAPI';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

class Nutrions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      modalVisible: false,
      currentDisplayFoods: [],
      foods: [],
      menus: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    let tempFoodArr = [];
    let tempMenusArr = [];
    getFoodsbyCurrentUser().then(data => {
      data.forEach(doc => {
        let food = doc.data();
        food.foodID = doc.id;
        tempFoodArr.push(food);
      });
    });
    getDefaultFoods()
      .then(data => {
        data.forEach(doc => {
          let food = doc.data();
          food.foodID = doc.id;
          tempFoodArr.push(food);
        });

        // console.log(tempFoodArr);
        this.setState({
          foods: tempFoodArr,
          currentDisplayFoods: tempFoodArr,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log(err);
      });

    getMenubyCurrentUser().then(data => {
      data.forEach(doc => {
        let menu = doc.data();
        menu.menuID = doc.id;
        tempMenusArr.push(menu);
      });
      console.log(tempMenusArr);
      this.setState({menus: tempMenusArr, isLoading: false});
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
          //console.log(Nutrion.id);
          deleteFood(Nutrion.foodID.toString())
            .then(res => console.log('a', res))
            .catch(err => console.log('b', err));
          deleteMenuDetailsByFoodID(Nutrion.foodID);
          this.componentDidMount();
        },
      },
    ]);
  };

  searchFood = () => {
    if (this.state.search === '') {
      this.setState({currentDisplayFoods: this.state.foods});
    } else {
      let resultSearchArr = [];
      this.state.foods.forEach(food => {
        if (
          food.foodName.toLowerCase().includes(this.state.search.toLowerCase())
        )
          resultSearchArr.push(food);
      });
      resultSearchArr.sort();
      this.setState({currentDisplayFoods: resultSearchArr});
    }
  };
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
            onChangeText={text => {
              this.setState({search: text});
            }}
            style={{
              width: '90%',
              height: 100,
              fontSize: 20,
              fontFamily: 'Roboto-Bold',
              paddingLeft: 20,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.searchFood();
            }}>
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
            data={this.state.currentDisplayFoods}
            renderItem={({item}) => (
              <Nutrion
                detail={item}
                menus={this.state.menus}
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
                  keyboardType="numeric"
                  maxLength={3}
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
function AddToMenuContainer(props) {
  const [isChecked, setIsChecked] = useState(false);
  //console.log ('props for funct', props);
  let menuTypeName = '';
  switch (props.menu.menuType) {
    case 'breakfast':
      menuTypeName = 'Sáng';
      break;
    case 'lunch':
      menuTypeName = 'Trưa';
      break;
    case 'dinner':
      menuTypeName = 'Tối';
      break;
    case 'snack':
      menuTypeName = 'Bữa phụ';
      break;
    default:
      menuTypeName = 'Sáng';
      break;
  }
  return (
    <View style={styles.addToMenuContainer}>
      <Text style={styles.addMenuTitle}>{menuTypeName}</Text>
      <CheckBox
        checked={isChecked}
        size={40}
        onPress={() => {
          setIsChecked(!isChecked);
          props.requestFoodToMenu(isChecked, props.menu);
        }}
      />
    </View>
  );
}

class Nutrion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      addModalVisible: false,
      addFoodToMenu: [],
      addFoodToMenuWithGrams: 0,
    };
  }

  requestFoodToMenu = (isChecked, menu) => {
    console.log(isChecked);
    let tempAddFoodToMenu = [...this.state.addFoodToMenu];

    if (!isChecked) {
      const newFoodToMenu = {
        menuID: menu.menuID,
        foodID: this.props.detail.foodID,
        amount: this.state.addFoodToMenuWithGrams,
      };
      tempAddFoodToMenu.push(newFoodToMenu);
      this.setState({addFoodToMenu: tempAddFoodToMenu});
    } else {
      let index = tempAddFoodToMenu.findIndex(
        add => add.menuID === menu.menuID,
      );
      if (index > -1) {
        tempAddFoodToMenu.splice(index, 1);
      }
      this.setState({addFoodToMenu: tempAddFoodToMenu});
    }
    console.log(tempAddFoodToMenu);
  };

  uploadMenuFoods = () => {
    if (
      this.state.addFoodToMenu.length < 1 ||
      this.addFoodToMenuWithGrams < 10
    ) {
      Alert.alert(
        'Chưa đủ thông tin',
        'Chọn ít nhất một bữa ăn và không được để trống Grams',
        [
          {
            text: 'OK',
            onPress: () => {
              return;
            },
          },
        ],
      );
    } else {
      let addFoodRequests = [...this.state.addFoodToMenu];
      addFoodRequests.forEach(request => {
        request.amount = this.state.addFoodToMenuWithGrams;
      });
      uploadMenuDetails(addFoodRequests);
      Alert.alert('Thêm vào thực đơn thành công', '', [
        {
          text: 'OK',
          onPress: () => {
            return;
          },
        },
      ]);
      this.onToggleAddModal();
    }
  };

  onToggleAddModal = () => {
    this.setState({addModalVisible: !this.state.addModalVisible});
  };
  render() {
    const detail = this.props.detail;
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
            width: '80%',
          }}>
          <Text style={{fontSize: 25, fontFamily: 'Roboto-Bold'}}>
            {detail.foodName}
          </Text>
          <Text style={{fontSize: 20, fontFamily: 'Roboto-Regular'}}>
            {detail.foodCalories} calo/100 gram{' '}
          </Text>
        </View>
        <View
          style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={this.onToggleAddModal}>
            <Icon name="add-circle-outline" size={35} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.deleteNutrion(detail)}>
            <Icon
              name="close-circle-outline"
              size={detail.isSystem ? 0 : 35}
              color="red"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.addModalContainer}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.addModalVisible}>
            <View style={styles.addModalView}>
              <Text style={styles.addMenuTitle}>Thêm vào thực đơn</Text>
              <FlatList
                data={this.props.menus}
                renderItem={({item}) => (
                  <AddToMenuContainer
                    menu={item}
                    food={detail}
                    requestFoodToMenu={(isChecked, menu) =>
                      this.requestFoodToMenu(isChecked, menu)
                    }
                  />
                )}
                keyExtractor={(item, index) => {
                  return index.toString();
                }}
              />

              <TextInput
                placeholder={'Grams?'}
                keyboardType="numeric"
                maxLength={3}
                onChangeText={text => {
                  this.setState(
                    {addFoodToMenuWithGrams: parseInt(text)},
                    () => {
                      console.log('grams: ', this.state.addFoodToMenuWithGrams);
                    },
                  );
                }}
                style={{
                  fontSize: 23,
                  fontFamily: 'Roboto-Regular',
                  width: '50%',
                  marginLeft: '3%',
                  borderBottomWidth: 2,
                  borderBottomColor: 'black',
                }}
              />
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
                    this.onToggleAddModal();
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
                  onPress={() => this.uploadMenuFoods()}>
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
  addMenuTitle: {fontSize: 30, fontFamily: 'Roboto-Bold'},
  addToMenuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: '2%',
  },
});

export default Nutrions;
