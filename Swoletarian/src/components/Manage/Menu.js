import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>AAAA</Text>
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

export default Menu;
