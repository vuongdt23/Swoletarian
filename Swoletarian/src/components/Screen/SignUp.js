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
import AwesomeAlert from 'react-native-awesome-alerts';

import {
  signUp,
  createInitialUserMenus,
  createInitialUserSchedules,
} from '../../Firebase/userAPI';
class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    email: '',
    password: '',
    repeatPassword: '',
    showUsedEmailErr: false,
    showWeakPasswordErr: false,
    showUnknownErr: false,
  };
  checkPassword = () => {
    if (this.state.password != this.state.repeatPassword) return false;
    return true;
  };

  checkEmailString = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email).toLowerCase());
  };

  handleButtonSignUpPress = () => {
    const {navigation} = this.props;
    signUp(this.state.email, this.state.password)
      .then(res => {
        createInitialUserSchedules();
        createInitialUserMenus();
        //console.log('1111111111111111111111');
        navigation.navigate('SetUp');
      })
      .catch(error => {
        console.log(error.code);
        if (error.code === 'auth/email-already-in-use') {
          this.setState({showUsedEmailErr: true});
        } else if (error.code === 'auth/weak-password') {
          this.setState({showWeakPasswordErr: true});
        } else {
          this.setState({showUnknownErr: true});
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Email</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={value => {
              this.setState({email: value});
            }}
          />
        </View>
        <View>
          {this.checkEmailString() ? null : (
            <Text
              style={{color: 'red', fontSize: 15, fontFamily: 'Roboto-thin'}}>
              ?????nh d???ng email ch??a ????ng{' '}
            </Text>
          )}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>M???t kh???u</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={value => {
              this.setState({password: value});
            }}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>X??c nh???n m???t kh???u</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={value => {
              this.setState({repeatPassword: value});
            }}
          />
        </View>
        <View>
          {this.checkPassword() ? null : (
            <Text
              style={{color: 'red', fontSize: 15, fontFamily: 'Roboto-thin'}}>
              M???t kh???u x??c nh???n kh??ng kh???p{' '}
            </Text>
          )}
        </View>
        <TouchableOpacity
          disabled={!this.checkPassword() && !this.checkEmailString()}
          style={{width: '90%', height: '8%', marginTop: '50%'}}
          onPress={() => {
            this.handleButtonSignUpPress(this.state.email, this.state.password);
          }}>
          <Text style={styles.buttonDK}>????ng k??</Text>
        </TouchableOpacity>

        <AwesomeAlert
          show={this.state.showWeakPasswordErr}
          showProgress={false}
          title="M???t kh???u qu?? ng???n"
          message="M???t kh???u b???n nh???p c???n ??t nh???t 6 k?? t???"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {}}
          onConfirmPressed={() => {
            this.setState({showWeakPasswordErr: false});
          }}
        />
        <AwesomeAlert
          show={this.state.showUsedEmailErr}
          showProgress={false}
          title="Email ???? ???????c s??? d???ng"
          message="Email b???n nh???p ???? ???????c ????ng k??"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.setState({showUsedEmailErr: false});
          }}
        />
        <AwesomeAlert
          show={this.state.showUnknownErr}
          showProgress={false}
          title="????ng k?? kh??ng th??nh c??ng"
          message="????ng k?? kh??ng th??nh c??ng, vui l??ng ki???m tra l???i"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.setState({showUnknownErr: false});
          }}
        />
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

export default SignUp;
