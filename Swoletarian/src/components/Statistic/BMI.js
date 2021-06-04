import React from 'react';
import {View} from 'react-native';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

class BMI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBMI: 0,
      currentWeight: 63,
      currentHeight: 170,
      BMIColor: 'black',
    };
  }
  componentDidMount = () => {
    this.setState({
      currentBMI: parseFloat(
        (this.state.currentWeight /
          this.state.currentHeight /
          this.state.currentHeight) *
          10000,
      ).toPrecision(4),
    });
    if (this.state.currentBMI < 18.5) this.setState({BMIColor: '#00FFFF'});
    else if (this.state.currentBMI >= 18.5 && this.state.currentBMI <= 24.9)
      this.setState({BMIColor: '#00FF29'});
    else if (this.state.currentBMI > 24.9 && this.state.currentBMI <= 29.9)
      this.setState({BMIColor: '#FFDF3A'});
    else this.setState({BMIColor: '#FF3A3A'});
  };
  render() {
    console.log(this.state.currentBMI.toString());
    console.log(this.state.BMIColor);
    console.log(3);
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerTitle}>BMI</Text>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.BMIDetailContainer}>
            <Text
              style={{
                fontSize: 80,
                fontFamily: 'Roboto-Bold',
                color: this.state.BMIColor.toString(),
              }}>
              {this.state.currentBMI}
            </Text>
            <View style={styles.BMIStats}>
              <Text style={styles.BMIStatsContent}>
                {this.state.currentHeight} cm
              </Text>
              <Text style={styles.BMIStatsContent}>
                {this.state.currentWeight} kg
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
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
  BMIDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    height: '20%',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    height: '30%',
    padding: '5%',
    marginVertical: '5%',
  },
  BMIStats: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '10%',
  },
  BMIValue: {
    fontSize: 80,
    fontFamily: 'Roboto-Bold',
  },
  BMIStatsContent: {
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
    color: '#A4FFFF',
    backgroundColor: '#005E7C',
    borderRadius: 10,
    margin: 5,
    padding: 5,
  },
});

export default BMI;
