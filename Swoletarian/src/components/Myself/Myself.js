import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import {Input} from 'react-native-elements/dist/input/Input';
import {logOut, getUserSetup} from '../../Firebase/userAPI';
import auth from '@react-native-firebase/auth';
import {Button} from 'react-native';
class MySelf extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    modalVisible: false,
    lastPassword: '',
    newPassword: '',
    user: null,
  };
  ontoggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };
  componentDidMount() {
    getUserSetup()
      .then(data => {
        console.log('docs found', data.size);
        console.log('data', data);
        if (data.size === 1) {
          data.forEach(doc => this.setState({user: doc.data()}));
        }

        data.forEach(doc => console.log('1', doc.data()));
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          This is{' '}
          {this.state.user == null
            ? auth().currentUser.email
            : JSON.stringify(this.state.user)}
        </Text>
        <Button
          title={'Click here to open SetUp'}
          onPress={() => {
            const {navigation} = this.props;
            navigation.navigate('SetUp');
          }}></Button>
        <Button
          title={'Click here to get Profile'}
          onPress={() => {
            this.getU;
          }}></Button>
        <TouchableOpacity
          onPress={() => this.handleLogout()}
          style={{backgroundColor: 'red'}}>
          <Text>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.ontoggleModal()}
          style={{backgroundColor: 'purple'}}>
          <Text>Change Password</Text>
        </TouchableOpacity>

        <View style={styles.modalContainer}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}>
            <View style={styles.modalView}>
              <Text style={styles.headerTitle}>Thêm mới</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '70%',
                  margin: 10,
                }}>
                <Text style={{fontSize: 20, fontFamily: 'Roboto-Regular'}}>
                  Mật khẩu cũ
                </Text>
                <Input
                  onChangeText={text => {
                    this.setState({lastPassword: text.toString().trim()});
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
                }}>
                <Text style={{fontSize: 20, fontFamily: 'Roboto-Regular'}}>
                  Mật khẩu mới
                </Text>
                <Input
                  onChangeText={text =>
                    this.setState({newPassword: text.toString().trim()})
                  }
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
                }}>
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
                    this.ontoggleModal();
                  }}>
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
                    this.handleChangePassword(
                      this.state.lastPassword,
                      this.state.newPassword,
                    );
                  }}>
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
    logOut();
    const {navigation} = this.props;
    navigation.navigate('Start');
  };
  handleChangePassword = (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword)
      .then(
        auth()
          .currentUser.updatePassword(newPassword)
          .then(() => {
            const {navigation} = this.props;
            Alert.alert('Đổi mật khẩu thành công', '', [
              {
                text: 'OK',
                onPress: () => {},
                style: 'cancel',
              },
            ]);
            navigation.navigate('Main');
          })
          .catch(err => {
            if (err.code === 'auth/wrong-password')
              Alert.alert('Mật khẩu cũ không chính xác!', '', [
                {
                  text: 'OK',
                  onPress: () => {},
                  style: 'cancel',
                },
              ]);
            else console.log(err);
          }),
      )
      .catch(err => {
        console.log(err);
      });
  };
  reauthenticate = currentPassword => {
    const user = auth().currentUser;
    const cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };
}
const styles = StyleSheet.create({
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
