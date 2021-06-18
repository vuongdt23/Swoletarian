import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from '../components/Screen/SignUp';
import ManageNavigator from './ManageNavigator';
import MySelf from '../components/Myself/Myself';
import Today from '../components/Today/Today';
const Tab = createBottomTabNavigator();
function MainBottomtabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Manage') {
            iconName = focused ? 'home-outline' : 'home-outline';
          } else if (route.name === 'Today') {
            iconName = focused ? 'checkmark-done' : 'checkmark-done';
          } else if (route.name === 'Myself') {
            iconName = focused ? 'person-outline' : 'person-outline';
          }
          return (
            <Icon name={iconName} size={focused ? 45 : 40} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: '#1CA2BB',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 0,
          margin: 0,
          padding: 0,
          fontFamily: 'Roboto-Bold',
        },
        style: {
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: '#0C2750',
        },
      }}>
      <Tab.Screen
        name="Manage"
        component={ManageNavigator}
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: {backgroundColor: '#1CA2BB'},
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        options={{unmountOnBlur: true}}
        name="Today"
        component={Today}
      />
      <Tab.Screen
        name="Myself"
        component={MySelf}
        options={{unmountOnBlur: true}}
      />
    </Tab.Navigator>
  );
}
export default MainBottomtabNavigator;
