import color from 'color';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {signUp} from '../../Firebase/userAPI';
class SignUp extends React.Component {
  constructor (props) {
    super (props);
  }
  state = {
    email: '',
    password: '',
    repeatPassword: '',
  };
  checkPassword = () => {
    if (this.state.password != this.state.repeatPassword) return false;
    return true;
  };

  checkEmailString = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test (String (this.state.email).toLowerCase ());
  };

  handleButtonSignUpPress = () => {
    const {navigation} = this.props;
    signUp (this.state.email, this.state.password)
      .then (res => {
        console.log (res);
        console.log('1111111111111111111111');
        navigation.navigate('Main');
      })
      .catch (error => {
        console.log (error.code);
        if (error.code === 'auth/email-already-in-use')
          Alert.alert ('Email đã được sử dụng', '', [
            {
              text: 'OK',
              onPress: () => {},
              style: 'cancel',
            },
          ]);
      });
  };

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Email</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={value => {
              this.setState ({email: value});
            }}
          />
        </View>
        <View>
          {this.checkEmailString ()
            ? null
            : <Text
            style={{color: 'red', fontSize: 15, fontFamily: 'Roboto-thin'}}
          >
            Định dạng email chưa đúng{' '}
          </Text>}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Mật khẩu</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={value => {
              this.setState ({password: value});
            }}
          />

        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Xác nhận mật khẩu</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={value => {
              this.setState ({repeatPassword: value});
            }}
          />
        </View>
        <View>
          {this.checkPassword ()
            ? null
            : <Text
                style={{color: 'red', fontSize: 15, fontFamily: 'Roboto-thin'}}
              >
                Mật khẩu xác nhận không khớp{' '}
              </Text>}
        </View>
        <TouchableOpacity
          disabled={!this.checkPassword () && !this.checkEmailString()}
          style={{width: '90%', height: '8%', marginTop: '20%'}}
          onPress={() => {
            this.handleButtonSignUpPress (
              this.state.email,
              this.state.password
            );
          }}
        >
          <Text style={styles.buttonDK}>Đăng ký</Text>
        </TouchableOpacity>
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
    height: 40,
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

export default SignUp;
