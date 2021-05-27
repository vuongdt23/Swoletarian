import auth from '@react-native-firebase/auth';
export const signUp = (email, password) => {
  auth ()
    .createUserWithEmailAndPassword (email, password)
    .then (() => {
      console.log ('User account created & signed in!', auth ().currentUser);
    })
    .catch (error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log ('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log ('That email address is invalid!');
      }

      console.error (error);
    });
};

export const logOut = () => {
  auth ().signOut ().then (() => console.log ('User signed out!'));
};

export const logIn = (email, password) => {
  auth ()
    .signInWithEmailAndPassword (email, password)
    .then (console.log ('Logged in successfully'))
    .catch (err => {
      console.log (err);
    });
};

export const forgetPassword = email => {
  auth ().sendPasswordResetEmail (email);
};

export const updatePassword = (currentPassword, newPassword) => {
  const user = auth ().currentUser;
  user
    .updatePassword (newPassword)
    .then (console.log ('updated password successfully'))
    .catch (err => console.log (err));
};
