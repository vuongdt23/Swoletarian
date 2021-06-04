import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native';
import {View, StyleSheet, Text} from 'react-native';
import {uploadUserSetup} from '../../Firebase/userAPI';
import DropDownPicker from 'react-native-dropdown-picker';
import auth from '@react-native-firebase/auth';
import {KeyboardAvoidingView} from 'react-native';
class SetUp extends React.Component {
  state = {
    userName: '',
    userAge: '',
    userSex: '',
    ownerID: '',
    userHeight: 0,
    userWeight: 0,
  };
  setDropdownValue = value => {
    this.setState({userSex: value});
  };
  handleSubmitButtonPress = () => {
    let submitValue = {...this.state};
    submitValue.ownerID = auth().currentUser.uid;
    console.log(submitValue);
    uploadUserSetup(submitValue)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tên</Text>
        <TextInput
          onChangeText={value => this.setState({userName: value})}
          style={styles.inputContainer}></TextInput>
        <Text style={styles.title}>Tuổi</Text>
        <TextInput
          onChangeText={value => this.setState({userAge: value})}
          style={styles.inputContainer}></TextInput>
        <Text style={styles.title}>Giới Tính</Text>
        <DropDown
          onChangeValue={value => {
            this.setDropdownValue(value);
          }}></DropDown>
        <Text style={styles.title}>Chiều cao(cm)</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.inputContainer}
          onChangeText={value =>
            this.setState({userHeight: value})
          }></TextInput>
        <Text style={styles.title}>Cân nặng(kg)</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.inputContainer}
          onChangeText={value =>
            this.setState({userWeight: value})
          }></TextInput>
        <TouchableOpacity
          onPress={() => this.handleSubmitButtonPress()}
          style={{
            backgroundColor: 'white',
            width: '30%',
            height: '10%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
            marginVertical: '5%',
          }}>
          <Text>OK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
function DropDown(props) {
  const itemsList = [
    {label: 'Nam', value: 'Male'},
    {label: 'nữ', value: 'Female'},
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState(itemsList);
  return (
    <DropDownPicker
      placeholder={'...'}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      maxHeight={300}
      containerStyle={{
        width: '90%',
      }}
      textStyle={{
        fontSize: 28,
        fontFamily: 'Roboto-Bold',
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
    justifyContent: 'center',
    alignItems: 'center',
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

export default SetUp;
