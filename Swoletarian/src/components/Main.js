import React from 'react';
import {StyleSheet} from 'react-native';
import MainBottomtabNavigator from '../navigators/MainBottomtabNavigator';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <MainBottomtabNavigator></MainBottomtabNavigator>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#0C2750',
    paddingLeft: 20,
  },
});

export default Main;
