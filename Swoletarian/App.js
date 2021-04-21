/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Logo from './src/assets/Logo.png';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.Logo} source={Logo}></Image>
        <TouchableOpacity onPress={() => console.log('aaa')}>
          <Text style={styles.buttonDN}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonDK}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Logo: {
    width: 384,
    height: 60,
    marginBottom: 274,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C2750',
  },
  buttonDN: {
    width: 362,
    height: 80,
    fontWeight: 'bold',
    borderRadius: 40,
    backgroundColor: '#F69314',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 19,
  },
  buttonDK: {
    marginTop: 21,
    width: 362,
    height: 80,
    fontWeight: 'bold',
    borderRadius: 40,
    backgroundColor: '#04BDB5',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 19,
  },
});

export default App;
