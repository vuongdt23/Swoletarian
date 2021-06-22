import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import {logIn} from '../../Firebase/userAPI';
class Login extends React.Component {
  constructor (props) {
    super (props);
  }
  state = {
    username: '',
    password: '',
    showWrongPasswordAlert: false,
    showUnregisteredEmailAlert: false,
    showUnknownLoginErrAleart: false,
    showInsufficientInputErrAlert: false,
  };
  onUsernameChange = event => {
    this.setState ({username: event.target.value});
    // console.log(event);
  };
  onPasswordChange = event => {
    this.setState ({password: event.target.value});
    // console.log(event);
  };
  handleLogin = (username, password) => {
    if (this.state.password.length < 1 || this.state.username.length < 1) {
      this.setState ({showInsufficientInputErrAlert: true});
      return;
    }
    logIn (username, password)
      .then (() => {
        const {navigation} = this.props;
        navigation.navigate ('Main');
      })
      .catch (err => {
        if (err.code === 'auth/wrong-password') {
          this.setState ({showWrongPasswordAlert: true});
        } else if (
          err.code === 'auth/user-not-found' ||
          err.code === 'auth/invalid-email'
        ) {
          this.setState ({showUnregisteredEmailAlert: true});
        } else {
          this.setState ({showUnknownLoginErrAleart: true});
          console.log (err.code);
        }
      });
  };
  render () {
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
              this.setState ({username: value});
            }}
            style={styles.input}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Mật khẩu</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry
            onChangeText={value => {
              // console.log (value);
              this.setState ({password: value});
            }}
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            this.handleLogin (this.state.username, this.state.password)}
          style={{width: '90%', height: '8%', marginTop: '80%'}}
        >
          <Text style={styles.buttonDN}>Đăng nhập</Text>
        </TouchableOpacity>
        <AwesomeAlert
          show={this.state.showWrongPasswordAlert}
          showProgress={false}
          title="Sai mật khẩu"
          message="Bạn đã nhập sai mật khẩu"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {}}
          onConfirmPressed={() => {
            this.setState ({showWrongPasswordAlert: false});
          }}
        />
        <AwesomeAlert
          show={this.state.showUnregisteredEmailAlert}
          showProgress={false}
          title="Email sai"
          message="Email bạn nhập sai định dạng hoặc chưa được đăng ký"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.setState ({showUnregisteredEmailAlert: false});
          }}
        />
        <AwesomeAlert
          show={this.state.showUnknownLoginErrAleart}
          showProgress={false}
          title="Đăng nhập không thành công"
          message="Đăng nhập không thành công, vui lòng kiểm tra lại"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.setState ({showUnknownLoginErrAleart: false});
          }}
        />
        <AwesomeAlert
          show={this.state.showInsufficientInputErrAlert}
          showProgress={false}
          title="Chưa đủ thông tin"
          message="Hãy nhập đủ email và mật khẩu"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.setState ({showInsufficientInputErrAlert: false});
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
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
