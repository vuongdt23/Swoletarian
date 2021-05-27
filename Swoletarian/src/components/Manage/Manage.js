import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Button,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import {BackgroundImage} from 'react-native-elements/dist/config';

import DinhDuong from '../../assets/DinhDuong.png';
import TapLuyen from '../../assets/TapLuyen.png';
import LichTap from '../../assets/LichTap.png';
import ThucDon from '../../assets/ThucDon.png';

class Manage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const DATA = [
      {
        id: 1,
        name: 'Dinh dưỡng',
        image: DinhDuong,
      },
      {
        id: 2,
        name: 'Luyện tập',
        image: TapLuyen,
      },
      {
        id: 3,
        name: 'Tạo lịch tập',
        image: LichTap,
      },
      {
        id: 4,
        name: 'Tạo thực đơn ngày',
        image: ThucDon,
      },
    ];

    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerTitle}> Quản lý </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DATA}
          renderItem={({item}) => (
            <ManageComponent
              detail={item}
              navigateTo={name => navigation.navigate(name)}></ManageComponent>
          )}
          keyExtractor={(item, index) => {
            return item.id.toString();
          }}></FlatList>
      </SafeAreaView>
    );
  }
}

class ManageComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {detail} = this.props;
    let name;
    if (detail.id == 1) name = 'Nutrions';
    else if (detail.id == 2) name = 'Workout';
    else if (detail.id == 3) name = 'Schedule';
    else name = 'Menu';
    const {navigateTo} = this.props;
    return (
      <View style={styles.componentContainer}>
        <TouchableOpacity onPress={() => navigateTo(name)}>
          <BackgroundImage
            source={detail.image}
            style={styles.backgroundImage}
            imageStyle={{borderRadius: 20}}>
            <Text style={styles.title}> {detail.name}</Text>
          </BackgroundImage>
        </TouchableOpacity>
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
  backgroundImage: {
    width: 450,
    height: 200,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'Roboto-Bold',
  },
  componentContainer: {},
  headerTitle: {
    fontSize: 45,
    color: '#000000',
    fontFamily: 'Roboto-Bold',
  },
});

export default Manage;
