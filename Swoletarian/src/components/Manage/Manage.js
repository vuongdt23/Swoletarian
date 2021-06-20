/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  View,
} from 'react-native';
import {BackgroundImage} from 'react-native-elements/dist/config';
import DinhDuong from '../../assets/home/DinhDuong.png';
import TapLuyen from '../../assets/home/Workout.png';
import LichTap from '../../assets/home/LichTap.png';
import ThucDon from '../../assets/home/ThucDon.png';
import Logo from '../../assets/Logo.png';

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
        name: 'Workouts',
        image: TapLuyen,
      },
      {
        id: 3,
        name: 'Lịch tập luyện',
        image: LichTap,
      },
      {
        id: 4,
        name: 'Thực đơn',
        image: ThucDon,
      },
    ];

    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerTitle}> Home </Text>
        <Image style={styles.Logo} source={Logo} />
        <View
          style={{
            width: '100%',
            height: '30%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Nutrions')}
            style={styles.componentContainer}>
            <BackgroundImage
              source={DinhDuong}
              style={styles.backgroundImage}
              imageStyle={{borderRadius: 20}}>
              {/* <Text style={styles.title}> {detail.name}</Text> */}
            </BackgroundImage>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Workout')}
            style={styles.componentContainer}>
            <BackgroundImage
              source={TapLuyen}
              style={styles.backgroundImage}
              imageStyle={{borderRadius: 20}}>
              {/* <Text style={styles.title}> {detail.name}</Text> */}
            </BackgroundImage>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            height: '30%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: '15%',
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Schedule')}
            style={styles.componentContainer}>
            <BackgroundImage
              source={LichTap}
              style={styles.backgroundImage}
              imageStyle={{borderRadius: 20}}>
              {/* <Text style={styles.title}> {detail.name}</Text> */}
            </BackgroundImage>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Menu')}
            style={styles.componentContainer}>
            <BackgroundImage
              source={ThucDon}
              style={styles.backgroundImage}
              imageStyle={{borderRadius: 20}}>
              {/* <Text style={styles.title}> {detail.name}</Text> */}
            </BackgroundImage>
          </TouchableOpacity>
        </View>
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
      <TouchableOpacity
        onPress={() => navigateTo(name)}
        style={styles.componentContainer}>
        <BackgroundImage
          source={detail.image}
          style={styles.backgroundImage}
          imageStyle={{borderRadius: 20}}>
          {/* <Text style={styles.title}> {detail.name}</Text> */}
        </BackgroundImage>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
    height: '100%',
  },
  flatListStyle: {
    width: '100%',
    marginTop: '3%',
  },
  backgroundImage: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  componentContainer: {
    width: '35%',
    height: 190,
    marginVertical: '5%',
    //marginLeft: '3%',
  },
  title: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'Roboto-Bold',
  },
  headerTitle: {
    fontSize: 45,
    color: '#000000',
    fontFamily: 'Roboto-Bold',
    marginVertical: '2%',
  },
  Logo: {
    width: '80%',
    height: '10%',
    marginTop: '5%',
    marginBottom: '5%',
  },
});

export default Manage;
