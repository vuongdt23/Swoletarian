/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Modal, Pressable, Alert} from 'react-native';
import {TextInput} from 'react-native';
import {View, StyleSheet, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {updateUserInfoByID} from '../../Firebase/userAPI';
function UpdateUserInfoModal(props) {
  const [userInfo, setUserInfo] = useState({
    userName: 'Phan Duy Đức',
    userHeight: 160,
    userWeight: 60,
    userSex: 'Nam',
    userAge: 10,
    userType: 'beginner',
    ownerID: 'aaaa123123',
  });
  const updateUserInfo = () => {
    updateUserInfoByID(props.userInfoID, userInfo)
      .then(res => {
        console.log(res);
        Alert.alert('Cập nhật thông tin thành công', '', [
          {
            text: 'OK',
            onPress: () => {},
            style: 'cancel',
          },
        ]);
        props.reloadAfterUpdate();
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    let userInfo = Object.assign({}, props.userInfo);
    setUserInfo(userInfo);
    //   console.log('user Info', props.userInfo);
  }, [props.userInfo]);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.updateUserInfoModalVisible}>
      <View style={styles.modalView}>
        <Text style={styles.title}>Tên</Text>
        <TextInput
          defaultValue={userInfo.userName.toString()}
          maxLength={30}
          onChangeText={value => {
            let newUserInfo = userInfo;
            newUserInfo.userName = value;
            setUserInfo(newUserInfo);
          }}
          style={styles.inputContainer}></TextInput>
        <Text style={styles.title}>Tuổi</Text>
        <TextInput
          defaultValue={userInfo.userAge.toString()}
          maxLength={3}
          keyboardType="numeric"
          onChangeText={value => {
            let newUserInfo = userInfo;
            newUserInfo.userAge = value;
            setUserInfo(newUserInfo);
          }}
          style={styles.inputContainer}></TextInput>
        <Text style={styles.title}>Giới Tính</Text>
        <SexDropDown
          defaultValue={capitalizeFirstLetter(
            userInfo.userSex === 'male' ? 'Nam' : 'Nữ',
          )}
          onChangeValue={value => {
            let newUserInfo = userInfo;
            newUserInfo.userSex = value;
            setUserInfo(newUserInfo);
          }}></SexDropDown>
        <Text style={styles.title}>Chiều cao(cm)</Text>
        <TextInput
          defaultValue={userInfo.userHeight.toString()}
          maxLength={3}
          keyboardType="numeric"
          style={styles.inputContainer}
          onChangeText={value => {
            let newUserInfo = userInfo;
            newUserInfo.userHeight = value;
            setUserInfo(newUserInfo);
          }}></TextInput>
        <Text style={styles.title}>Cân nặng(kg)</Text>
        <TextInput
          defaultValue={userInfo.userWeight.toString()}
          maxLength={3}
          keyboardType="numeric"
          style={styles.inputContainer}
          onChangeText={value => {
            let newUserInfo = userInfo;
            newUserInfo.userWeight = value;
            setUserInfo(newUserInfo);
          }}></TextInput>
        <Text style={styles.title}>Bạn là ?</Text>
        <UserTypeDropDown
          defaultValue={capitalizeFirstLetter(userInfo.userType)}
          onChangeValue={value => {
            let newUserInfo = userInfo;
            newUserInfo.userType = value;
            setUserInfo(newUserInfo);
          }}></UserTypeDropDown>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            height: '20%',
          }}>
          <Pressable
            style={{
              width: '40%',
              height: '45%',
              borderRadius: 25,
              backgroundColor: '#FFA693',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              props.onToggleUpdateModal();
            }}>
            <Text style={{fontSize: 25, fontFamily: 'Roboto-Bold'}}>Hủy</Text>
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
              updateUserInfo();
            }}>
            <Text style={{fontSize: 25, fontFamily: 'Roboto-Bold'}}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
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
      placeholder={props.defaultValue}
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
      placeholder={props.defaultValue}
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
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'space-between',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    height: '90%',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    height: '10%',
    fontSize: 25,
    color: 'black',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
    color: 'black',
  },
});

export default UpdateUserInfoModal;
