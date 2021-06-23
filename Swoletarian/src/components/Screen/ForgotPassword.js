import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {forgetPassword} from '../../Firebase/userAPI';
import {Value} from 'react-native-reanimated';
import AwesomeAlert from 'react-native-awesome-alerts';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    requestSent: false,
    email: '',
    showInvalidEmailErr: false,
    showUnknownErr: false,
  };
  handleRequestButtonPress = () => {
    forgetPassword(this.state.email)
      .then(res => {
        this.setState({requestSent: true});
      })
      .catch(err => {
        if (
          err.code === 'auth/invalid-email' ||
          err.code === 'auth/user-not-found'
        ) {
          this.setState({showInvalidEmailErr: true});
        } else {
          this.setState({showUnknownErr: true});
        }
      });
  };
  checkEmailString = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email).toLowerCase());
  };
  render() {
    if (this.state.requestSent)
      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            Hãy kiểm tra email của bạn để tiếp tục{' '}
          </Text>
          <TouchableOpacity
            style={{width: '90%', height: '8%', marginTop: '20%'}}
            onPress={() => {
              const {navigation} = this.props;
              navigation.navigate('Start');
            }}>
            <Text style={styles.buttonDK}>Quay lại Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      );

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Nhập Email</Text>
        </View>
        <TextInput
          placeholder="email"
          onChangeText={value => this.setState({email: value})}
          style={{
            backgroundColor: 'white',
            borderRadius: 45,
            width: '100%',
            height: '6%',
            fontSize: 25,
            color: 'black',
          }}
        />
        <View>
          {this.checkEmailString() ? null : (
            <Text
              style={{color: 'red', fontSize: 15, fontFamily: 'Roboto-thin'}}>
              Định dạng email chưa đúng{' '}
            </Text>
          )}
        </View>
        <TouchableOpacity
          disabled={!this.checkEmailString()}
          style={{width: '90%', height: '8%', marginTop: '20%'}}
          onPress={() => {
            this.handleRequestButtonPress();
          }}>
          <Text style={styles.buttonDK}>Gửi mã xác nhận</Text>
        </TouchableOpacity>
        <AwesomeAlert
          show={this.state.showInvalidEmailErr}
          showProgress={false}
          title="Email sai"
          message="Email bạn nhập sai hoặc chưa được đăng ký"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {}}
          onConfirmPressed={() => {
            this.setState({showInvalidEmailErr: false});
          }}
        />

        <AwesomeAlert
          show={this.state.showUnknownErr}
          showProgress={false}
          title="Gửi yêu cầu không thành công"
          message="Gửi yêu cầu không thành công, vui lòng kiểm tra lại"
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
    alignItems: 'center',
    backgroundColor: '#0C2750',
    paddingHorizontal: '5%',
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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

export default ForgotPassword;
