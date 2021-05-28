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
import {logIn} from '../../Firebase/userAPI';
class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    username: '',
    password: '',
  };
  onUsernameChange = event => {
    this.setState({username: event.target.value});
    // console.log(event);
  };
  onPasswordChange = event => {
    this.setState({password: event.target.value});
    // console.log(event);
  };
  handleLogin = (username, password) => {
    logIn(username, password)
      .then(() => {
        const {navigation} = this.props;
        navigation.navigate('Main');
      })
      .catch(err => console.log(err));
  };
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tên đăng nhập</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={value => {
              //console.log(value);
              this.setState({username: value});
            }}
            style={styles.input}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Mật khẩu</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={value => {
              // console.log (value);
              this.setState({password: value});
            }}
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            this.handleLogin(this.state.username, this.state.password)
          }
          style={{width: '90%', height: '8%', marginTop: '80%'}}>
          <Text style={styles.buttonDN}>Đăng nhập</Text>
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
    fontSize: 18,
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
  buttonDN: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: '#58DADA',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    fontFamily: 'Roboto-Thin',
  },
});

export default Login;
