/* eslint-disable react/self-closing-comp */
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {TextInput, Alert} from 'react-native';
import {View, StyleSheet, Text} from 'react-native';
import {uploadUserSetup} from '../../Firebase/userAPI';
import DropDownPicker from 'react-native-dropdown-picker';
import auth from '@react-native-firebase/auth';
class SetUp extends React.Component {
  state = {
    userName: '',
    userAge: '',
    userSex: '',
    ownerID: '',
    userHeight: 0,
    userWeight: 0,
    userType: '',
  };
  setSex = value => {
    this.setState({userSex: value});
  };
  setUserType = value => {
    this.setState({userType: value});
  };
  checkUserInfo = () => {
    if (
      this.state.userName === '' ||
      this.state.userAge === '' ||
      this.state.userSex === '' ||
      this.state.userHeight === 0 ||
      this.state.userWeight === 0 ||
      this.state.userType === ''
    )
      return false;
    return true;
  };
  handleSubmitButtonPress = () => {
    if (this.checkUserInfo()) {
      let submitValue = {...this.state};
      submitValue.ownerID = auth().currentUser.uid;
      console.log(submitValue);
      uploadUserSetup(submitValue)
        .then(res => {
          console.log(res);
          this.props.navigation.navigate('Main');
        })
        .catch(err => console.log(err));
      Alert.alert('Cập nhật thông tin thành công', '', [
        {
          text: 'OK',
          onPress: () => {
            const {navigation} = this.props;
            navigation.navigate('Myself');
          },
          style: 'cancel',
        },
      ]);
    } else {
      Alert.alert('Chưa đủ thông tin', '', [
        {
          text: 'OK',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Nhập thông tin cá nhân</Text>
        <Text style={styles.title}>Tên</Text>
        <TextInput
          maxLength={30}
          onChangeText={value => this.setState({userName: value})}
          style={styles.inputContainer}></TextInput>
        <Text style={styles.title}>Tuổi</Text>
        <TextInput
          maxLength={3}
          keyboardType="numeric"
          onChangeText={value => this.setState({userAge: parseInt(value)})}
          style={styles.inputContainer}></TextInput>
        <Text style={styles.title}>Giới Tính</Text>
        <SexDropDown
          onChangeValue={value => {
            this.setSex(value);
          }}></SexDropDown>
        <Text style={styles.title}>Chiều cao(cm)</Text>
        <TextInput
          maxLength={3}
          keyboardType="numeric"
          style={styles.inputContainer}
          onChangeText={value =>
            this.setState({userHeight: parseInt(value)})
          }></TextInput>
        <Text style={styles.title}>Cân nặng(kg)</Text>
        <TextInput
          maxLength={3}
          keyboardType="numeric"
          style={styles.inputContainer}
          onChangeText={value =>
            this.setState({userWeight: parseInt(value)})
          }></TextInput>
        <Text style={styles.title}>Bạn là ?</Text>
        <UserTypeDropDown
          onChangeValue={value => {
            this.setUserType(value);
          }}></UserTypeDropDown>
        <View
          style={{
            width: '100%',
            height: '8%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginVertical: '5%',
          }}>
          <TouchableOpacity
            onPress={() => this.handleSubmitButtonPress()}
            style={{
              backgroundColor: '#63E5E5',
              width: '30%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginVertical: '5%',
            }}>
            <Text style={{fontSize: 30, fontFamily: 'Roboto-Light'}}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
function SexDropDown(props) {
  const itemsList = [
    {label: 'Nam', value: 'male'},
    {label: 'Nữ', value: 'female'},
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState(itemsList);
  return (
    <DropDownPicker
      placeholder={''}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      maxHeight={300}
      containerStyle={{
        width: '100%',
        height: '8%',
      }}
      textStyle={{
        fontSize: 25,
        fontFamily: 'Roboto-Regular',
      }}
      onChangeValue={value => {
        props.onChangeValue(value);
      }}
    />
  );
}

function UserTypeDropDown(props) {
  const itemsList = [
    {label: 'Beginner', value: 'beginner'},
    {label: 'Intermediate', value: 'intermediate'},
    {label: 'Advanced', value: 'advanced'},
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState(itemsList);
  return (
    <DropDownPicker
      placeholder={''}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      maxHeight={300}
      containerStyle={{
        width: '100%',
        height: '8%',
      }}
      textStyle={{
        fontSize: 25,
        fontFamily: 'Roboto-Regular',
      }}
      onChangeValue={value => {
        props.onChangeValue(value);
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#0C2750',
    paddingHorizontal: '5%',
    paddingVertical: '7%',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    height: '6%',
    fontSize: 25,
    color: 'black',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Roboto-Thin',
    color: 'white',
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
  headerTitle: {
    fontSize: 45,
    color: 'white',
    fontFamily: 'Roboto-Bold',
    marginVertical: '2%',
  },
});

export default SetUp;
