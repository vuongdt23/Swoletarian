import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Start from '../components/Start';
import Login from '../components/Screen/Login';
import Signin from '../components/Screen/Signin';
import Main from '../components/Main';
const Stack = createStackNavigator();
class StartNavigator extends React.Component {
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

export default StartNavigator;
