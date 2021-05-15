import React from 'react';
import {SafeAreaView, TouchableOpacity, FlatList} from 'react-native';

class Statistic extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <SafeAreaView style={styles.container}></SafeAreaView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDD93',
  },
});

export default Statistic;
