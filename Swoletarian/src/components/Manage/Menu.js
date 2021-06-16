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
import DropDownPicker from 'react-native-dropdown-picker';
import {FlatList} from 'react-native-gesture-handler';
import DeleteIcon from '../../assets/Icon/DeleteIcon.png';
import {getFoodbyID} from '../../Firebase/foodAPI';
import {
  getMenubyCurrentUser,
  getFoodsfromMenu,
  getMenuDetailsfromMenu,
  deleteMenuDetail,
} from '../../Firebase/MenuAPI';
import Nutrions from './Nutrions';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      menuDetails: [],
      currentMealName: '',
      currentMeal: [],
      Breakfast: [],
      Lunch: [],
      Dinner: [],
      Snack: [],
    };
  }
  componentDidMount() {
    this.setState(
      {
        isLoading: true,
        menuDetails: [],
        currentMealName: '',
        currentMeal: [],
        Breakfast: [],
        Lunch: [],
        Dinner: [],
        Snack: [],
      },
      () => {
        this.loadMenus();
      },
    );
  }

  deleteNutrion = nutrion => {
    Alert.alert(
      'Xóa khỏi thực đơn',
      'Bạn muốn xóa ' + nutrion.foodName + ' ?',
      [
        {
          text: 'Hủy',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => {
            deleteMenuDetail(nutrion.menuDetailID)
              .then(res => {
                console.log(res);
                this.reloadAfterDelete(
                  this.state.currentMealName,
                  nutrion.menuDetailID,
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
      ],
    );
  };
  setCurrentMeal = meal => {
    //console.log ('menu state of', this.state.menuDetails[4]);
    this.setState({currentMealName: meal});
    let menuIndex = 0;
    let details = [];
    let tempFoods = [];
    switch (meal) {
      case 'Breakfast':
        menuIndex = this.state.menuDetails.findIndex(
          menu => menu.menuType === 'breakfast',
        );
        // console.log ('menu index', menuIndex);
        details = [...this.state.menuDetails[menuIndex].menuDetails];
        console.log(details);
        tempFoods = [];
        if (details.length === 0) {
          this.setState({Breakfast: tempFoods}, () => {
            console.log('breakfast', this.state.Breakfast);
            this.setState({currentMeal: [...this.state.Breakfast]});
          });
        } else {
          details.forEach(detail => {
            getFoodbyID(detail.foodID)
              .then(res => {
                let foodObj = res.data();
                foodObj.menuDetailID = detail.menuDetailID;
                console.log('food', res.data());
                foodObj.amount = detail.amount;
                console.log('Food OBject', foodObj);
                tempFoods.push(foodObj);
                this.setState({Breakfast: tempFoods}, () => {
                  console.log('breakfast', this.state.Breakfast);
                  this.setState({currentMeal: [...this.state.Breakfast]});
                });
              })
              .catch(err => {
                console.log(err);
              });
          });
        }
        break;
      case 'Lunch':
        menuIndex = this.state.menuDetails.findIndex(
          menu => menu.menuType === 'lunch',
        );
        console.log('menu index', menuIndex);
        details = [...this.state.menuDetails[menuIndex].menuDetails];
        console.log(details);
        tempFoods = [];
        if (details.length === 0) {
          this.setState({Lunch: tempFoods}, () => {
            console.log('lunch', this.state.Lunch);
            this.setState({currentMeal: [...this.state.Lunch]});
          });
        } else {
          details.forEach(detail => {
            getFoodbyID(detail.foodID)
              .then(res => {
                let foodObj = res.data();
                foodObj.menuDetailID = detail.menuDetailID;
                console.log('food', res.data());
                foodObj.amount = detail.amount;
                console.log('Food OBject', foodObj);
                tempFoods.push(foodObj);
                this.setState({Lunch: tempFoods}, () => {
                  console.log('lunch', this.state.Lunch);
                  this.setState({currentMeal: [...this.state.Lunch]});
                });
              })
              .catch(err => {
                console.log(err);
              });
          });
        }
        break;
      case 'Dinner':
        menuIndex = this.state.menuDetails.findIndex(
          menu => menu.menuType === 'dinner',
        );
        console.log('menu index', menuIndex);
        details = [...this.state.menuDetails[menuIndex].menuDetails];
        console.log(details);
        tempFoods = [];
        if (details.length === 0) {
          this.setState({Dinner: tempFoods}, () => {
            console.log('dinner', this.state.Dinner);
            this.setState({currentMeal: [...this.state.Dinner]});
          });
        } else {
          details.forEach(detail => {
            getFoodbyID(detail.foodID)
              .then(res => {
                let foodObj = res.data();
                foodObj.menuDetailID = detail.menuDetailID;
                console.log('food', res.data());
                foodObj.amount = detail.amount;
                console.log('Food OBject', foodObj);
                tempFoods.push(foodObj);
                this.setState({Dinner: tempFoods}, () => {
                  console.log('Dinner', this.state.Dinner);
                  this.setState({currentMeal: [...this.state.Dinner]});
                });
              })
              .catch(err => {
                console.log(err);
              });
          });
        }
        break;
      case 'Snack':
        menuIndex = this.state.menuDetails.findIndex(
          menu => menu.menuType === 'snack',
        );
        console.log('menu index', menuIndex);
        details = [...this.state.menuDetails[menuIndex].menuDetails];
        console.log(details);
        tempFoods = [];
        if (details.length === 0) {
          this.setState({Snack: tempFoods}, () => {
            console.log('snack', this.state.Snack);
            this.setState({currentMeal: [...this.state.Snack]});
          });
        } else {
          details.forEach(detail => {
            getFoodbyID(detail.foodID)
              .then(res => {
                let foodObj = res.data();
                foodObj.menuDetailID = detail.menuDetailID;
                console.log('food', res.data());
                foodObj.amount = detail.amount;
                console.log('Food OBject', foodObj);
                tempFoods.push(foodObj);
                this.setState({Dinner: tempFoods}, () => {
                  console.log('Dinner', this.state.Dinner);
                  this.setState({currentMeal: [...this.state.Dinner]});
                });
              })
              .catch(err => {
                console.log(err);
              });
          });
        }
        break;
    }
  };
  reloadAfterDelete = (currentMeal, deletedMenuDetailID) => {
    let tempMealState = [];
    let indexDel = 0;
    switch (currentMeal) {
      case 'Breakfast':
        tempMealState = [...this.state.Breakfast];
        indexDel = tempMealState.findIndex(
          menuDetail => menuDetail.menuDetailID === deletedMenuDetailID,
        );
        console.log('delete at ', indexDel);
        if (indexDel > -1) {
          tempMealState.splice(indexDel, 1);
          console.log('meal state after deletion', tempMealState);
        }
        this.setState({currentMeal: tempMealState});
        this.setState({Breakfast: tempMealState}, () => {});
        break;
      case 'Lunch':
        tempMealState = [...this.state.Lunch];
        indexDel = tempMealState.findIndex(
          menuDetail => menuDetail.menuDetailID === deletedMenuDetailID,
        );
        console.log('delete at ', indexDel);
        if (indexDel > -1) {
          tempMealState.splice(indexDel, 1);
          console.log('meal state after deletion', tempMealState);
        }
        this.setState({currentMeal: tempMealState});
        this.setState({Lunch: tempMealState});
        break;
      case 'Dinner':
        tempMealState = [...this.state.Dinner];
        indexDel = tempMealState.findIndex(
          menuDetail => menuDetail.menuDetailID === deletedMenuDetailID,
        );
        console.log('delete at ', indexDel);
        if (indexDel > -1) {
          tempMealState.splice(indexDel, 1);
          console.log('meal state after deletion', tempMealState);
        }
        this.setState({currentMeal: tempMealState});
        this.setState({Dinner: tempMealState});

        break;
      case 'Snack':
        tempMealState = [...this.state.Snack];
        indexDel = tempMealState.findIndex(
          menuDetail => menuDetail.menuDetailID === deletedMenuDetailID,
        );
        console.log('delete at ', indexDel);
        if (indexDel > -1) {
          tempMealState.splice(indexDel, 1);
          console.log('meal state after deletion', tempMealState);
        }
        this.setState({currentMeal: tempMealState});
        this.setState({Snack: tempMealState});
        break;
    }
  };
  deleteCurrentMenu = () => {
    Alert.alert('Xóa thực đơn', 'Bạn muốn xóa thực đơn hiện tại?', [
      {
        text: 'Hủy',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Xóa',
        onPress: () => {
          let menuDetailState = [...this.state.menuDetails];
          let menuDetailStateNew = [...this.state.menuDetails];
          menuDetailState.forEach(menu => {
            menu.menuDetails.forEach(menuDetail => {
              deleteMenuDetail(menuDetail.menuDetailID)
                .then(res => console.log('res', res))
                .catch(err => {
                  console.log(err);
                });
            });
          });
          menuDetailStateNew.forEach(menu => {
            menu.menuDetails = [];
          });
          this.setState({menuDetails: menuDetailStateNew});
          this.setState({currentMeal: []});
          this.setState({Breakfast: []});
          this.setState({Lunch: []});
          this.setState({Dinner: []});
          this.setState({Snack: []});
          this.setState({currentDayName: ''});
        },
      },
    ]);
  };

  loadMenus = () => {
    let tempMenuArr = [];
    let finalMenuArr = [];
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
              if (res.empty) finalMenuArr.push(menuDetailList);
              else {
                res.forEach(doc => {
                  let tempMenuObj = doc.data();
                  tempMenuObj.menuDetailID = doc.id;
                  menuDetailList.menuDetails.push(tempMenuObj);
                  //  console.log (menuDetailList);
                });
                finalMenuArr.push(menuDetailList);
              }
              this.setState(
                {menuDetails: finalMenuArr, isLoading: false},
                () => {
                  // console.log ('aaaaaaaaaaaaaaaaaaaaa', this.state.menuDetails);
                },
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
  render() {
    if (this.state.isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#1CA2BB" />
        </View>
      );
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Thực đơn</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateContent}>{new Date().toDateString()}</Text>
        </View>
        <View>
          <DropDown
            callDropDownValue={meal => this.setCurrentMeal(meal)}
            defaultValue={this.state.currentMealName}
          />
        </View>
        <View style={styles.contentContainer}>
          <FlatList
            numColumns={1}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
            style={styles.flatListContainer}
            showsVerticalScrollIndicator={false}
            data={this.state.currentMeal}
            renderItem={({item}) => (
              <Nutrion
                data={item}
                deleteNutrion={nutrion => {
                  this.deleteNutrion(nutrion);
                }}
              />
            )}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
              height: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.deleteCurrentMenu();
              }}>
              <Text style={styles.deleteButton}>Xóa thực đơn hiện tại</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate('Nutrions');
              }}>
              <Text style={styles.deleteButton}>Thêm món mới</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

class Nutrion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {data} = this.props;
    let calos = (data.foodCalories * data.amount) / 100;
    return (
      <View style={styles.nutrionContainer}>
        <Text style={styles.nutrionTitle}>{data.foodName}</Text>
        <Text style={styles.caloTitle}>{data.foodCalories}calos/100gram</Text>
        <View style={styles.calosContainer}>
          <Text style={styles.gramsTitle}>{data.amount} grams</Text>
          <Text style={styles.calosTitle}>{calos.toString()} calos</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.deleteNutrion(data);
          }}
          style={{width: '8%', height: '40%'}}>
          <Image
            source={DeleteIcon}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

function DropDown(props) {
  const itemsList = [
    {label: 'Sáng', value: 'Breakfast'},
    {label: 'Trưa', value: 'Lunch'},
    {label: 'Tối', value: 'Dinner'},
    {label: 'Bữa phụ ', value: 'Snack'},
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
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
  },
  nutrionContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  contentContainer: {
    marginTop: '5%',
    height: '75%',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: '5%',
  },
  button: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#1CA2BB',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
    marginBottom: 10,
  },
  deleteButton: {
    fontSize: 25,
    fontFamily: 'Roboto-Bold',
  },
  nutrionTitle: {
    fontSize: 25,
    fontFamily: 'Roboto-Bold',
    width: '20%',
  },
  caloTitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    width: '35%',
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
});

export default Menu;
