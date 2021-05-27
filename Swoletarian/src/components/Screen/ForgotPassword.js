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

class ForgotPassword extends React.Component {
  constructor (props) {
    super (props);
  }
  state = {
    requestSent: false,
    email: '',
  };
  handleRequestButtonPress = () => {
    forgetPassword (this.state.email);
    this.setState ({requestSent: true});
  };
  render () {
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
            }}
          >
            <Text  style={styles.buttonDK}>Quay lại Đăng nhập</Text>
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
          onChangeText={value => this.setState ({email: value})}
        />
        <TouchableOpacity
          style={{width: '90%', height: '8%', marginTop: '20%'}}
          onPress={() => {
            this.handleRequestButtonPress ();
          }}
        >
          <Text style={styles.buttonDK}>Gửi mã xác nhận</Text>
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

export default ForgotPassword;
