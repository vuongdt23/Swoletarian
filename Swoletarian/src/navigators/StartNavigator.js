import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Start from '../components/Start';
import Login from '../components/Screen/Login';
import Signin from '../components/Screen/Signin';
import Main from '../components/Main';
import MySelf from '../components/Myself/Myself';
import auth from '@react-native-firebase/auth';
import {View, Text} from 'react-native';
import ForgotPassword from '../components/Screen/ForgotPassword';

const Stack = createStackNavigator ();
class StartNavigator extends React.Component {
  constructor (props) {
    super (props);
  }
  render () {
    return (
      <NavigationContainer>
        <Stack.Navigator
          style={{flex: 1}}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name='MySelf' component={MySelf}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default StartNavigator;
