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
        <TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#0C2750',
    paddingLeft: 20,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 45,
    width: 500,
    height: 60,
  },
  input: {
    fontSize: 18,
  },
  title: {
    fontSize: 25,
    fontFamily: 'Roboto-Thin',
    color: 'white',
  },
  titleContainer: {
    marginVertical: 10,
  },
  buttonDK: {
    width: 500,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#C8FFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    fontFamily: 'Roboto-Thin',
    marginTop: 120,
    marginBottom: 20,
  },
});

export default Signin;
