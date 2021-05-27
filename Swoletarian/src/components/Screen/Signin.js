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
  ImageBackground,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Signin extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tên đăng nhập</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}></TextInput>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Mật khẩu</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}></TextInput>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Xác nhận mật khẩu</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}></TextInput>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Email</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}></TextInput>
        </View>
        <TouchableOpacity
          style={{width: '90%', height: '8%', marginTop: '20%'}}
          onPress={() => {}}>
          <Text style={styles.buttonDK}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#0C2750',
    paddingLeft: '10%',
    paddingTop: '10%',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 45,
    width: '90%',
    height: '8%',
  },
  input: {
    fontSize: 20,
  },
  title: {
    fontSize: 25,
    fontFamily: 'Roboto-Thin',
    color: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonDK: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: '#C8FFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    fontFamily: 'Roboto-Thin',
  },
});

export default Signin;
