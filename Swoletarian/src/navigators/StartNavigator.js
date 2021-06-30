import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Start from '../components/Start';
import Login from '../components/Screen/Login';
import SignUp from '../components/Screen/SignUp';
import Main from '../components/Main';
import MySelf from '../components/Myself/Myself';
import SetUp from '../components/Screen/SetUp';
import auth from '@react-native-firebase/auth';
import {View, Text} from 'react-native';
import ForgotPassword from '../components/Screen/ForgotPassword';
import CalosAnalysis from '../components/Statistic/CalosAnalysis';

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
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signin" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="MySelf" component={MySelf} />
          <Stack.Screen name="SetUp" component={SetUp} />
          <Stack.Screen name="CalosAnalysis" component={CalosAnalysis} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default StartNavigator;
