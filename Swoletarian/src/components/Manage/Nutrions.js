import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Alert,
  Pressable,
  Button,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Input} from 'react-native-elements/dist/input/Input';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

class Nutrions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      modalVisible: false,
      data: [
        {
          id: 1,
          name: 'Gạo nếp',
          calo: 130,
          isSystem: 'true',
        },
        {
          id: 2,
          name: 'Bơ đậu',
          calo: 580,
          isSystem: 'true',
        },
        {
          id: 3,
          name: 'Thịt bò',
          calo: 278,
          isSystem: 'true',
        },
        {
          id: 4,
          name: 'Khoai tây',
          calo: 90,
          isSystem: 'true',
        },
        {
          id: 5,
          name: 'Bơ',
          calo: 160,
          isSystem: 'true',
        },
        {
          id: 6,
          name: 'Thịt gà',
          calo: 165,
          isSystem: 'false',
        },
      ],
    };
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
    newNutrion.id = this.getNewId();
    const newData = [].concat(this.state.data, newNutrion);
    this.setState({data: newData});
    this.setState({modalVisible: false});
  };
  deleteNutrion = Nutrion => {
    var newData = this.state.data;
    Alert.alert('Xóa thực phẩm', 'Bạn muốn xóa thực phẩm này ?', [
      {
        text: 'Xóa',
        onPress: () =>
          newData.map((element, index) => {
            if (element.id == Nutrion.id) newData.splice(index, 1);
          }),
      },
      {
        text: 'Hủy',
        onPress: () => {},
        style: 'cancel',
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
      id: 0,
      name: '',
      calo: 0,
      isSystem: 'false',
    };
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}> Dinh Dưỡng</Text>
        <View style={styles.searchBarContainer}>
          <Icon name="search" size={28}></Icon>
          <TextInput
            style={{
              width: 400,
              fontSize: 20,
              fontFamily: 'Roboto-Bold',
              paddingLeft: 20,
              paddingVertical: 0,
            }}></TextInput>
        </View>

        <View style={styles.addNewContainer}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => this.setModalVisible(!modalVisible)}>
            <Icon name="add" size={40}></Icon>
            <Text style={{fontSize: 25, fontFamily: 'Roboto-Bold'}}>
              Thêm thực phẩm
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          renderItem={({item}) => (
            <Nutrion
              detail={item}
              deleteNutrion={Nutrion => this.deleteNutrion(Nutrion)}></Nutrion>
          )}
          extraData={this.state.data}
          keyExtractor={(item, index) => {
            return item.id.toString();
          }}></FlatList>
        <View style={styles.modalContainer}>
          <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View style={styles.modalView}>
              <Text style={styles.headerTitle}>Thêm mới</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 300,
                  margin: 10,
                }}>
                <Text style={{fontSize: 20, fontFamily: 'Roboto-Regular'}}>
                  Tên thực phẩm
                </Text>
                <Input onChangeText={text => (newNutrion.name = text)}></Input>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 300,
                  margin: 10,
                }}>
                <Text style={{fontSize: 20, fontFamily: 'Roboto-Regular'}}>
                  Calories/100gram
                </Text>
                <Input onChangeText={text => (newNutrion.calo = text)}></Input>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Pressable
                  style={{
                    width: 200,
                    height: 50,
                    borderRadius: 20,
                    backgroundColor: '#FFA693',
                    justifyContent: 'center',
                    alignItems: 'center',
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
                    width: 200,
                    height: 50,
                    borderRadius: 20,
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
        width: 500,
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
          {detail.name}
        </Text>
        <Text style={{fontSize: 20, fontFamily: 'Roboto-Regular'}}>
          {detail.calo} calo/100 gram{' '}
        </Text>
      </View>
      <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
        <TouchableOpacity>
          <Icon name="add-circle-outline" size={35}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.deleteNutrion(detail)}>
          <Icon
            name="close-circle-outline"
            size={detail.isSystem == 'true' ? 0 : 35}
            color="red"></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
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
  },
  searchBarContainer: {
    width: 500,
    height: 60,
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
    width: 500,
    height: 150,
    marginVertical: 15,
  },
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 400,
    marginTop: 200,
  },
});

export default Nutrions;
