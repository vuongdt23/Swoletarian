import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
class BFP extends React.Component {
  constructor (props) {
    super (props);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Button title={'uploadExercies'}></Button>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDD93',
  },
});

export default BFP;
