import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Signin from '../components/Screen/Signin';
import Login from '../components/Screen/Login';
import Manage from '../components/Manage/Manage';
import {NavigationContainer} from '@react-navigation/native';
import ManageNavigator from './ManageNavigator';
const Tab = createBottomTabNavigator();

function MainBottomtabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Manage') {
            iconName = focused ? 'list' : 'list';
          } else if (route.name === 'Statistic') {
            iconName = focused ? 'bar-chart-outline' : 'bar-chart-outline';
          } else if (route.name === 'Today') {
            iconName = focused ? 'checkmark-done' : 'checkmark-done';
          } else if (route.name === 'Myself') {
            iconName = focused ? 'person-outline' : 'person-outline';
          }
          return <Icon name={iconName} size={35} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#1CA2BB',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 20,
          margin: 0,
          padding: 0,
          fontFamily: 'Time New Roman',
        },
        style: {
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Manage"
        component={ManageNavigator}
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: {backgroundColor: '#1CA2BB'},
        }}
      />
      <Tab.Screen name="Statistic" component={Signin}></Tab.Screen>
      <Tab.Screen name="Today" component={Login} />
      <Tab.Screen name="Myself" component={Login} />
    </Tab.Navigator>
  );
}
export default MainBottomtabNavigator;
