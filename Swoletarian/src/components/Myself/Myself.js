import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import {logOut} from '../../Firebase/userAPI';
class MySelf extends React.Component {
  constructor (props) {
    super (props);
  }
  render () {
    return (
      <View>
        <Text>This is Myself</Text>
        <TouchableOpacity onPress={()=>this.handleLogout()} style={{backgroundColor: 'red'}}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
  handleLogout = () => {
    logOut ();
    const {navigation} = this.props;
    navigation.navigate('Start');
  };
}

export default MySelf;
