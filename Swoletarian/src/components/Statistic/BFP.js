import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import {uploadExercises} from '../../Firebase/defaultExercises';
class BFP extends React.Component {
  constructor (props) {
    super (props);
  }
  uploadExercisesto = () => uploadExercises;
  render () {
    return <SafeAreaView style={styles.container}>
   
    </SafeAreaView>
    
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
