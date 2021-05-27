import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import Nutrions from '../components/Manage/Nutrions';
import Menu from '../components/Manage/Menu';
import Workout from '../components/Manage/Workout';
import Schedule from '../components/Manage/Schedule';
import Manage from '../components/Manage/Manage';
import {SafeAreaView} from 'react-native-safe-area-context';
const Stack = createStackNavigator();
class ManageNavigator extends React.Component {
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
          <Stack.Screen name="Manage" component={Manage}></Stack.Screen>
          <Stack.Screen name="Nutrions" component={Nutrions}></Stack.Screen>
          <Stack.Screen name="Workout" component={Workout}></Stack.Screen>
          <Stack.Screen name="Schedule" component={Schedule}></Stack.Screen>
          <Stack.Screen name="Menu" component={Menu}></Stack.Screen>
        </Stack.Navigator>
      </SafeAreaView>
    );
  }
}

export default ManageNavigator;
