import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  Pressable,
  Alert,
  Image,
  ActivityIndicator,
  Button,
} from 'react-native';
import {Input} from 'react-native-elements/dist/input/Input';
import {logOut, getUserSetup} from '../../Firebase/userAPI';
import auth from '@react-native-firebase/auth';
import Female from '../../assets/Icon/Female.png';
import Male from '../../assets/Icon/Male.png';
import EditIcon from '../../assets/Icon/EditIcon.png';
import SettingIcon from '../../assets/Icon/SettingIcon.png';
import UpdateUserInfoModal from './UpdateInfoModal';
class MySelf extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isLoading: true,
    passwordModalVisible: false,
    updateUserInfoModalVisible: false,
    lastPassword: '',
    newPassword: '',
    checkPassword: '',
    user: null,
    userInfo: {
      userName: '',
      userHeight: 0,
      userWeight: 0,
      userSex: '',
      userAge: 0,
      userType: '',
      ownerID: '',
    },
    userInfoID: '',
  };
  onToggleUpdateModal = () => {
    this.setState({
      updateUserInfoModalVisible: !this.state.updateUserInfoModalVisible,
    });
  };
  ontogglePassWordModal = () => {
    this.setState({passwordModalVisible: !this.state.passwordModalVisible});
  };
  componentDidMount() {
    getUserSetup()
      .then(data => {
        console.log(data.size);
        if (data.size === 1) {
          data.forEach(doc => {
            let userInfoObject = doc.data();
            this.setState({
              userInfo: userInfoObject,
              isLoading: false,
              userInfoID: doc.id,
            });
            console.log('data of this user', doc.data());
            console.log('user info ID', doc.id);
          });
        }

        // data.forEach(doc => console.log('1', doc.data()));
      })
      .catch(err => console.log(err));
  }
  checkPassword = () => {
    if (this.state.newPassword !== this.state.checkPassword) return false;
    return true;
  };
  render() {
    const userInfo = this.state.userInfo;
    const BMI = parseFloat(
      (userInfo.userWeight / userInfo.userHeight / userInfo.userHeight) * 10000,
    ).toPrecision(4);
    let temp = '';
    if (BMI < 18.5) return 'Bạn đang thiếu cân';
    else if (BMI >= 18.5 && BMI <= 24.9) temp = 'BMI chuẩn';
    else if (BMI > 24.9 && BMI <= 29.9) temp = 'Bạn đang thừa cân';
    else temp = 'Bạn đang béo phì';
    if (this.state.isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#1CA2BB" />
        </View>
      );
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Cá nhân</Text>
        <View style={styles.userInfoContainer}>
          <View style={styles.userNameContainer}>
            <Image
              source={userInfo.userSex === 'male' ? Male : Female}
              style={{width: '12%'}}></Image>
            <Text style={styles.userNameTitle}>
              {userInfo.userName.toString()}
            </Text>
            <TouchableOpacity
              style={styles.EditButton}
              onPress={() => {
                this.onToggleUpdateModal();
              }}>
              <Image
                source={EditIcon}
                style={{width: '100%', height: '100%'}}></Image>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '90%',
              height: '20%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: '100%',
                width: '50%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.userAge}>
                Tuổi: {userInfo.userAge.toString()}
              </Text>
              <Text style={styles.userAge}>
                Giới tính:{' '}
                {userInfo.userSex.toString() === 'male' ? 'Nam' : 'Nữ'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('CalosAnalysis', {
                  userInfo: this.state.userInfo,
                });
              }}
              style={styles.TDEEButton}>
              <Text style={styles.TDEETitle}>TDEE</Text>
              <ActivityIndicator size="large" color="#1CA2BB" />
            </TouchableOpacity>
          </View>

          <View style={styles.BMIContainer}>
            <View style={styles.BMIDetail}>
              <Text style={styles.BMITitle}>BMI</Text>
              <Text style={styles.BMI}>{BMI.toString()}</Text>
              <Text style={styles.comment}>{temp}</Text>
            </View>
            <View style={styles.BMIStats}>
              <View>
                <Text style={styles.useHeight}>
                  {userInfo.userHeight.toString()} cm
                </Text>
                <Text style={styles.heightTitle}>Chiều cao</Text>
              </View>
              <View>
                <Text style={styles.userWeight}>
                  {userInfo.userWeight.toString()} kg
                </Text>
                <Text style={styles.heightTitle}>Cân nặng</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.settingContainer}>
          <View style={styles.settingIconContainer}>
            <Image source={SettingIcon}></Image>
          </View>
          <TouchableOpacity
            style={styles.LogOutButton}
            onPress={() => this.ontogglePassWordModal()}>
            <Text style={styles.BMITitle}>Đổi mật khẩu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.LogOutButton}
            onPress={() => {
              this.handleLogout();
            }}>
            <Text style={styles.BMITitle}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalContainer}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.passwordModalVisible}>
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
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Roboto-Regular',
                    width: '40%',
                  }}>
                  Mật khẩu cũ
                </Text>
                <Input
                  secureTextEntry={true}
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
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Roboto-Regular',
                    width: '40%',
                  }}>
                  Mật khẩu mới
                </Text>
                <Input
                  secureTextEntry={true}
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
                  width: '70%',
                  margin: 10,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Roboto-Regular',
                    width: '40%',
                  }}>
                  Xác nhận mật khẩu
                </Text>
                <Input
                  secureTextEntry={true}
                  onChangeText={text =>
                    this.setState({checkPassword: text.toString().trim()})
                  }
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                  }}
                />
              </View>
              <View>
                {this.checkPassword() ? null : (
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 15,
                      fontFamily: 'Roboto-thin',
                    }}>
                    Mật khẩu xác nhận không khớp
                  </Text>
                )}
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
                    this.ontogglePassWordModal();
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
        <UpdateUserInfoModal
          userInfoID={this.state.userInfoID}
          userInfo={this.state.userInfo}
          updateUserInfoModalVisible={this.state.updateUserInfoModalVisible}
          onToggleUpdateModal={() => this.onToggleUpdateModal()}
          reloadAfterUpdate={() =>
            this.reloadAfterUpdate()
          }></UpdateUserInfoModal>
      </View>
    );
  }

  reloadAfterUpdate = () => {
    this.setState({isLoading: true});
    this.componentDidMount();
    this.onToggleUpdateModal();
  };
  handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn muốn đăng xuất ?', [
      {
        text: 'Hủy',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          logOut();
          const {navigation} = this.props;
          navigation.navigate('Start');
        },
      },
    ]);
  };
  handleChangePassword = (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword)
      .then(res => {
        console.log(res);
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
            Alert.alert('Đổi mật khẩu không thành công', '', [
              {
                text: 'OK',
                onPress: () => {},
                style: 'cancel',
              },
            ]);
          });
      })
      .catch(err => {
        console.log(err.code);
        if (err.code === 'auth/wrong-password')
          Alert.alert('Mật khẩu cũ không chính xác!', '', [
            {
              text: 'OK',
              onPress: () => {},
              style: 'cancel',
            },
          ]);
        else {
          Alert.alert('Đổi mật khẩu không thành công', '', [
            {
              text: 'OK',
              onPress: () => {},
              style: 'cancel',
            },
          ]);
        }
      });
  };
  reauthenticate = currentPassword => {
    const user = auth().currentUser;
    const cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
    console.log(cred);
    return user.reauthenticateWithCredential(cred);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
  },
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
  userInfoContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 15,
    width: '90%',
    height: '50%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '5%',
    marginVertical: '5%',
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '25%',
    width: '90%',
  },
  userNameTitle: {
    fontSize: 35,
    fontFamily: 'Roboto-Bold',
    marginLeft: '5%',
    width: '70%',
  },
  EditButton: {
    width: '12%',
    height: '55%',
  },
  userAge: {
    fontFamily: 'Roboto-Bold',
    fontSize: 25,
    width: '90%',
    alignItems: 'flex-start',
    marginVertical: '1%',
  },
  BMIContainer: {
    width: '90%',
    height: '50%',
    borderRadius: 15,
    backgroundColor: '#63E5E5',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  BMIDetail: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '100%',
  },
  BMIStats: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
    height: '100%',
    paddingVertical: '8%',
  },
  useHeight: {
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
  },
  userWeight: {
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
  },
  heightTitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Light',
  },
  BMITitle: {
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
  },
  BMI: {
    fontSize: 35,
    fontFamily: 'Roboto-Bold',
    color: '#AD1515',
  },
  settingContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 15,
    width: '90%',
    height: '30%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '5%',
  },
  settingIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '25%',
    width: '90%',
  },
  LogOutButton: {
    width: '90%',
    height: '30%',
    backgroundColor: '#63E5E5',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comment: {
    fontSize: 25,
    fontFamily: 'Roboto-Light',
  },
  TDEEButton: {
    width: '30%',
    height: '100%',
    borderRadius: 15,
    borderColor: '#1CA2BB',
    borderWidth: 3,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  TDEETitle: {
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
    color: '#1CA2BB',
  },
});

export default MySelf;
