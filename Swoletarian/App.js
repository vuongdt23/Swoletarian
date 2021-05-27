import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {signUp, logIn, logOut, forgetPassword, updatePassword} from './src/Firebase/userAPI';
function App () {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState (true);
  const [user, setUser] = useState ();

  // Handle user state changes
  function onAuthStateChanged (user) {
    setUser (user);
    if (initializing) setInitializing (false);
  }

  useEffect (() => {
    const subscriber = auth ().onAuthStateChanged (onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Button
          title="Login"
          onPress={() => logIn ('vuong.vl00@gmail.com', '123456')}
        />
        <Button
          title="forget"
          onPress={() => forgetPassword ('vuong.vl0000@gmail.com')}
        />
        <Button
          title="update"
          onPress={() => updatePassword ('123456', 'asdvuong123')}
        />
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <Button title="Log Out" onPress={() => logOut ()} />
      <Button
          title="update"
          onPress={() => updatePassword ('123456', 'asdvuong123')}
        />
    </View>
  );
}

export default App;
