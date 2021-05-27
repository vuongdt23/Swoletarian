import React from 'react';
import {View, StyleSheet} from 'react-native';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View></View>;
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

export default Schedule;
