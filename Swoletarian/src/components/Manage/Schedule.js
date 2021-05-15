import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{new Date().toDateString()}</Text>
        </View>
      </View>
    );
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
