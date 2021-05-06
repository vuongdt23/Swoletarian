import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

class Nutrions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      data: [
        {
          id: 1,
          name: 'Gạo nếp',
          calo: 130,
        },
        {
          id: 2,
          name: 'Bơ đậu',
          calo: 580,
        },
        {
          id: 3,
          name: 'Thịt bò',
          calo: 278,
        },
        {
          id: 4,
          name: 'Khoai tây',
          calo: 90,
        },
        {
          id: 5,
          name: 'Bơ',
          calo: 160,
        },
      ],
    };
  }
  updateSearch = search => {
    this.setState({search});
  };
  render() {
    const {search} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}> Dinh Dưỡng</Text>
        <SearchBar
          placeholder="Tìm kiếm..."
          onChangeText={this.updateSearch}
          value={search}
          containerStyle={{
            backgroundColor: 'none',
            borderRadius: 20,
            width: 500,
            marginVertical: 20,
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
            borderWidth: 0,
            borderRadius: 20,
            height: 60,
          }}
          inputStyle={{fontSize: 20}}
          style={styles.searchBar}></SearchBar>

        <View style={styles.addNewContainer}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="add-circle-outline" size={40}></Icon>
            <Text style={{fontSize: 25, fontFamily: 'Roboto-Bold'}}>
              Thêm thực phẩm
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          renderItem={({item}) => <Nutrion detail={item}></Nutrion>}
          keyExtractor={(item, index) => {
            return item.id.toString();
          }}></FlatList>
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
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 25, fontFamily: 'Roboto-Bold'}}>
          {detail.name}
        </Text>
        <Text style={{fontSize: 20, fontFamily: 'Roboto-Regular'}}>
          {detail.calo} calo/100 gram{' '}
        </Text>
      </View>
      <View>
        <TouchableOpacity>
          <Icon name="add" size={35}></Icon>
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
  searchBar: {},
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
});

export default Nutrions;
