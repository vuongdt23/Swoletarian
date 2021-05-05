import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Login from '../components/Screen/Login';
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
            iconName = focused ? 'linechart' : 'linechart';
          } else if (route.name === 'Today') {
            iconName = focused ? 'checkmark-done' : 'checkmark-done';
          } else if (route.name === 'Myself') {
            iconName = focused ? 'person-outline' : 'person-outline';
          }
          return <Icon name={iconName} size={35} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
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
      <Tab.Screen name="Manage" component={Login} options={{tabBarBadge: 3}} />
      <Tab.Screen name="Statistic" component={Login}></Tab.Screen>
      <Tab.Screen name="Today" component={Login} />
      <Tab.Screen name="Myself" component={Login} />
    </Tab.Navigator>
  );
}
export default MainBottomtabNavigator;
