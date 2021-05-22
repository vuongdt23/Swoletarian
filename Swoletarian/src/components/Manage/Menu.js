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
import DeleteIcon from '../../assets/Icon/DeleteIcon.png';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMealName: '',
      currentMeal: [],
      Breakfirst: [
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
      ],
      Lunch: [],
      Dinner: [],
      SupMeal1: [],
      SupMeal2: [],
      SupMeal3: [],
    };
  }
  deleteNutrion = nutrion => {
    var newData = this.state.currentMeal;
    Alert.alert('Xóa thực phẩm', 'Bạn muốn xóa ' + nutrion.name + '?', [
      {
        text: 'Hủy',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Xóa',
        onPress: () => {
          newData.map((element, index) => {
            if (element.id == nutrion.id) newData.splice(index, 1);
          });
          this.setState({currentMeal: newData});
          switch (this.state.currentMealName) {
            case 'Breakfirst':
              this.setState({Breakfirst: newData});
              break;
            case 'Lunch':
              this.setState({Tuesday: newData});
              break;
            case 'Dinner':
              this.setState({Dinner: newData});
              break;
            case 'SupMeal1':
              this.setState({SupMeal1: newData});
              break;
            case 'SupMeal2':
              this.setState({SupMeal2: newData});
              break;
            case 'SupMeal3':
              this.setState({SupMeal3: newData});
              break;
          }
        },
      },
    ]);
  };
  setCurrentMeal = meal => {
    this.setState({currentMealName: meal});
    switch (meal) {
      case 'Breakfirst':
        this.setState({currentMeal: this.state.Breakfirst});
        break;
      case 'Lunch':
        this.setState({currentMeal: this.state.Lunch});
        break;
      case 'Dinner':
        this.setState({currentMeal: this.state.Dinner});
        break;
      case 'SupMeal1':
        this.setState({currentMeal: this.state.SupMeal1});
        break;
      case 'SupMeal2':
        this.setState({currentMeal: this.state.SupMeal2});
        break;
      case 'SupMeal3':
        this.setState({currentMeal: this.state.SupMeal3});
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
          this.setState({currentMeal: []});
          this.setState({Breakfirst: []});
          this.setState({Lunch: []});
          this.setState({Dinner: []});
          this.setState({SupMeal1: []});
          this.setState({SupMeal2: []});
          this.setState({SupMeal3: []});
          this.setState({currentDayName: ''});
        },
      },
    ]);
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Thực đơn</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateContent}>{new Date().toDateString()}</Text>
        </View>
        <View>
          <DropDown
            callDropDownValue={meal => this.setCurrentMeal(meal)}></DropDown>
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
                }}></Nutrion>
            )}
            keyExtractor={(item, index) => {
              return item.id.toString();
            }}></FlatList>
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
    return (
      <View style={styles.nutrionContainer}>
        <Text style={styles.nutrionTitle}>{data.name}</Text>
        <Text style={styles.caloTitle}>{data.calo}calos/100gram</Text>
        <View style={styles.calosContainer}>
          <Text style={styles.gramsTitle}>{data.grams} grams</Text>
          <Text style={styles.calosTitle}>
            {() => {
              let calos = data.calo * data.grams;
              return calos.toString();
            }}{' '}
            calos
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.deleteNutrion(data);
          }}
          style={{width: '10%', height: '30%'}}>
          <Image
            source={DeleteIcon}
            style={{
              width: '100%',
              height: '100%',
            }}></Image>
        </TouchableOpacity>
      </View>
    );
  }
}

function DropDown(props) {
  const itemsList = [
    {label: 'Sáng', value: 'Breakfirst'},
    {label: 'Trưa', value: 'Lunch'},
    {label: 'Tối', value: 'Dinner'},
    {label: 'Bữa phụ 1', value: 'SupMeal1'},
    {label: 'Bữa phụ 2', value: 'SupMeal2'},
    {label: 'Bữa phụ 3', value: 'SupMeal3'},
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
    justifyContent: 'space-around',
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
  },
  nutrionContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '100%',
    height: 150,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  contentContainer: {
    marginTop: '5%',
    height: '60%',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
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
  },
  caloTitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
  },
  calosContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
