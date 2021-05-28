import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import {Input} from 'react-native-elements/dist/input/Input';
import {logOut, updatePassword} from '../../Firebase/userAPI';
import auth from '@react-native-firebase/auth';
class MySelf extends React.Component {
  constructor (props) {
    super (props);
  }
  state = {
    modalVisible: false,
    lastPassword: '',
    newPassword: '',
  };
  ontoggleModal = () => {
    this.setState ({modalVisible: !this.state.modalVisible});
  };
  render () {
    return (
      <View style={styles.container}>
        <Text>This is {auth ().currentUser.email}</Text>
        <TouchableOpacity
          onPress={() => this.handleLogout ()}
          style={{backgroundColor: 'red'}}
        >
          <Text>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.ontoggleModal ()}
          style={{backgroundColor: 'purple'}}
        >
          <Text>Change Password</Text>
        </TouchableOpacity>

        <View style={styles.modalContainer}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View style={styles.modalView}>
              <Text style={styles.headerTitle}>Thêm mới</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '70%',
                  margin: 10,
                }}
              >
                <Text style={{fontSize: 20, fontFamily: 'Roboto-Regular'}}>
                  Mật khẩu cũ
                </Text>
                <Input
                  onChangeText={text => {
                    console.log (text);
                    this.setState ({lastPassword: text.toString ().trim ()});
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '70%',
                  margin: 10,
                }}
              >
                <Text style={{fontSize: 20, fontFamily: 'Roboto-Regular'}}>
                  Mật khẩu mới
                </Text>
                <Input
                  onChangeText={text =>
                    this.setState ({newPassword: text.toString ().trim ()})}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Pressable
                  style={{
                    width: '40%',
                    height: '45%',
                    borderRadius: 25,
                    backgroundColor: '#FFA693',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '5%',
                  }}
                  onPress={() => {
                    this.ontoggleModal ();
                  }}
                >
                  <Text style={{fontSize: 25, fontFamily: 'Roboto-Bold'}}>
                    Hủy
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    width: '40%',
                    height: '45%',
                    borderRadius: 25,
                    backgroundColor: '#C8FFFF',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.handleChangePassword (
                      this.state.lastPassword,
                      this.state.newPassword
                    );
                  }}
                >
                  <Text style={{fontSize: 25, fontFamily: 'Roboto-Bold'}}>
                    OK
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
  handleLogout = () => {
    logOut ();
    const {navigation} = this.props;
    navigation.navigate ('Start');
  };
  handleChangePassword = (currentPassword, newPassword) => {
    updatePassword (currentPassword, newPassword)
      .then (res => console.log (res))
      .catch (err => console.log (err));
  };
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFDD93',
  },
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    height: '60%',
    marginTop: '30%',
  },
  headerTitle: {
    fontSize: 45,
    color: '#000000',
    fontFamily: 'Roboto-Bold',
    marginVertical: '2%',
  },
});

export default MySelf;
