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
} from 'react-native';
import {Input} from 'react-native-elements/dist/input/Input';
import {logOut, getUserSetup} from '../../Firebase/userAPI';
import auth from '@react-native-firebase/auth';
import {Button} from 'react-native';
import Female from '../../assets/Icon/Female.png';
import Male from '../../assets/Icon/Male.png';
import EditIcon from '../../assets/Icon/EditIcon.png';
import SettingIcon from '../../assets/Icon/SettingIcon.png';
class MySelf extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    modalVisible: false,
    lastPassword: '',
    newPassword: '',
    user: null,
    userInfo: {
      userName: 'Phan Duy Đức',
      userHeight: 170,
      userWeight: 65,
      userSex: 'Male',
      userAge: 21,
    },
  };
  ontoggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };
  componentDidMount() {
    getUserSetup()
      .then(data => {
        if (data.size === 1) {
          data.forEach(doc => this.setState({user: doc.data()}));
        }

        data.forEach(doc => console.log('1', doc.data()));
      })
      .catch(err => console.log(err));
    console.log('1' + this.state.user);
    console.log('2' + this.state.userInfo);
  }
  render() {
    const userInfo = this.state.userInfo;
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Cá nhân</Text>
        <View style={styles.userInfoContainer}>
          <View style={styles.userNameContainer}>
            <Image source={userInfo.userSex === 'Male' ? Male : Female}></Image>
            <Text style={styles.userNameTitle}>{userInfo.userName}</Text>
            <TouchableOpacity style={styles.EditButton}>
              <Image
                source={EditIcon}
                style={{width: '100%', height: '100%'}}></Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.userAge}>Tuổi: {userInfo.userAge}</Text>
          <Text style={styles.userAge}>
            Giới tính: {userInfo.userSex === 'Male' ? 'Nam' : 'Nữ'}
          </Text>
          <View style={styles.BMIContainer}>
            <View style={styles.BMIDetail}>
              <Text style={styles.BMITitle}>BMI</Text>
              <Text style={styles.BMI}>
                {parseFloat(
                  (userInfo.userWeight /
                    userInfo.userHeight /
                    userInfo.userHeight) *
                    10000,
                ).toPrecision(4)}
              </Text>
              <Text>
                {() => {
                  const BMI = parseFloat(
                    (userInfo.userWeight /
                      userInfo.userHeight /
                      userInfo.userHeight) *
                      10000,
                  ).toPrecision(4);
                  if (BMI < 18.5) return 'Bạn đang thiếu cân';
                  else if (BMI >= 18.5 && BMI <= 24.9) return 'BMI chuẩn';
                  else if (BMI > 24.9 && BMI <= 29.9)
                    return 'Bạn đang thừa cân';
                  else return 'Bạn đang béo phì';
                }}
              </Text>
            </View>
            <View style={styles.BMIStats}>
              <View>
                <Text style={styles.useHeight}>{userInfo.userHeight} cm</Text>
                <Text style={styles.heightTitle}>Chiều cao</Text>
              </View>
              <View>
                <Text style={styles.userWeight}>{userInfo.userWeight} kg</Text>
                <Text style={styles.heightTitle}>Cân nặng</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.settingContainer}>
          <View style={styles.settingIconContainer}>
            <Image source={SettingIcon}></Image>
          </View>
          <TouchableOpacity style={styles.LogOutButton}>
            <Text style={styles.BMITitle}>Đổi mật khẩu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.LogOutButton}>
            <Text style={styles.BMITitle}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#E9E9E9',
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
});

export default MySelf;
