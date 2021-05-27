import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import BMI from '../components/Statistic/BMI';
import BFP from '../components/Statistic/BFP';
import CalosAnalysis from '../components/Statistic/CalosAnalysis';
import Statistic from '../components/Statistic/Statistic';

import {SafeAreaView} from 'react-native-safe-area-context';
const Stack = createStackNavigator();
class StatisticNavigator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFDD93'}}>
        <Stack.Navigator
          style={{flex: 1}}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Statistic" component={Statistic}></Stack.Screen>
          <Stack.Screen name="BMI" component={BMI}></Stack.Screen>
          <Stack.Screen name="BFP" component={BFP}></Stack.Screen>
          <Stack.Screen
            name="CalosAnalysis"
            component={CalosAnalysis}></Stack.Screen>
        </Stack.Navigator>
      </SafeAreaView>
    );
  }
}

export default StatisticNavigator;
