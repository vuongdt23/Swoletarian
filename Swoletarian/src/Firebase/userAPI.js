import auth from '@react-native-firebase/auth';
export const signUp = (email, password) => {
  return auth ().createUserWithEmailAndPassword (email, password);
};

export const logOut = () => {
  return auth ().signOut ().then (() => console.log ('User signed out!'));
};

export const logIn = (email, password) => {
  return auth ().signInWithEmailAndPassword (email, password);
};

export const forgetPassword = email => {
  return auth ().sendPasswordResetEmail (email);
};

export const updatePassword = (currentPassword, newPassword) => {
  return reauthenticate (currentPassword).then (() => {
    const user = auth ().currentUser;
    user.updatePassword (newPassword);
  });
};

export const reauthenticate = currentPassword => {
  const user = auth ().currentUser;
  const cred = auth.EmailAuthProvider.credential (user.email, currentPassword);
  return user.reauthenticateWithCredential (cred);
};
