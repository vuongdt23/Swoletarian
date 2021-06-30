import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {BackgroundImage} from 'react-native-elements/dist/config';
import BMI from '../../assets/statistic/BMI.png';
import BFP from '../../assets/statistic/BFP.png';
import CalosAnalysis from '../../assets/statistic/CalosAnalysis.png';

class Statistic extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const DATA = [
      {
        id: 1,
        name: 'BMI',
        image: BMI,
      },
      {
        id: 2,
        name: 'BFP',
        image: BFP,
      },
      {
        id: 3,
        name: 'CalosAnalysis',
        image: CalosAnalysis,
      },
    ];
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerTitle}>Thống kê</Text>
        <FlatList
          style={styles.flatListStyle}
          showsVerticalScrollIndicator={false}
          data={DATA}
          renderItem={({item}) => (
            <StatisticComponent
              detail={item}
              navigateTo={name =>
                navigation.navigate(name)
              }></StatisticComponent>
          )}
          keyExtractor={(item, index) => {
            return item.id.toString();
          }}></FlatList>
      </SafeAreaView>
    );
  }
}

class StatisticComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {detail} = this.props;
    let name;
    if (detail.id == 1) name = 'BMI';
    else if (detail.id == 2) name = 'BFP';
    else if (detail.id == 3) name = 'CalosAnalysis';
    const {navigateTo} = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigateTo(name)}
        style={styles.componentContainer}>
        <BackgroundImage
          source={detail.image}
          style={styles.backgroundImage}
          imageStyle={{borderRadius: 20}}></BackgroundImage>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
  },
  flatListStyle: {
    width: '80%',
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
    width: '100%',
    height: 200,
    marginVertical: 20,
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
});

export default Statistic;
