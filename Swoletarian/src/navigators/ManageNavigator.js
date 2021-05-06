import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Nutrions from '../components/Manage/Nutrions';
import Menu from '../components/Manage/Menu';
import Workout from '../components/Manage/Workout';
import Schedule from '../components/Manage/Schedule';

const Stack = createStackNavigator();
class ManageNavigator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          style={{flex: 1}}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Start" component={Start}></Stack.Screen>
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
          <Stack.Screen name="Signin" component={Signin}></Stack.Screen>
          <Stack.Screen name="Main" component={Main}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default ManageNavigator;
