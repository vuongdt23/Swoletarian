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
  ImageBackground,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewStartScreen';
import Logo from '../assets/Logo.png';
import Background from '../assets/Background.png';

class Start extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={Background}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          <Image style={styles.Logo} source={Logo}></Image>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 120,
            }}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: 'Roboto-Thin',
                color: '#ffffff',
              }}>
              Become stronger with our App
            </Text>
            <Image></Image>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonDN}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <Text style={styles.buttonDK}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.textContainer}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Logo: {
    width: 352,
    height: 70,
    marginBottom: 162,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C2750',
  },
  buttonDN: {
    width: 480,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#58DADA',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    fontFamily: 'Roboto-Thin',
    marginBottom: 20,
  },
  buttonDK: {
    width: 480,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#C8FFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    fontFamily: 'Roboto-Thin',
  },
  textContainer: {
    fontFamily: 'Roboto-Thin',
    color: 'white',
    fontSize: 19,
    marginTop: 30,
  },
});

export default Start;
