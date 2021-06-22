import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  getScheduleTypes,
  createSchedule,
  createScheduleDetail,
} from './ScheduleAPI';
import {getMenuTypes, createMenu} from './MenuAPI';
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

export const uploadUserSetup = infoObj => {
  return firestore ().collection ('users').add (infoObj);
};

export const getUserSetup = async () => {
  const id = auth ().currentUser.uid;
  //console.log (id);
  return await firestore ()
    .collection ('users')
    .where ('ownerID', '==', id)
    .get ();
};

export const updateUserInfoByID = (userInfoID, updatedUserInfoObj) => {
  return firestore ()
    .collection ('users')
    .doc (userInfoID)
    .update (updatedUserInfoObj);
};

export const createInitialUserSchedules = () => {
  const id = auth ().currentUser.uid;
  let schTypes = [];
  getScheduleTypes ()
    .then (res => {
      console.log (res);
      res.forEach (doc => {
        // console.log(doc.data());
        schTypes.push (doc.id);
      });

      let newArr = schTypes.map (schedule => {
        return {
          scheduleType: schedule,
          scheduleOwner: id,
        };
      });

      newArr.forEach (schedule => {
        createSchedule (schedule)
          .then (res => {
            console.log (res);
          })
          .catch (err => {
            console.log (err);
          });
      });
         console.log ('schedules to make', newArr);
      //  console.log('Schedule types', schTypes);
    })
    .catch (err => {
      console.log (err);
    });
};

export const createInitialUserMenus = () => {
  const id = auth ().currentUser.uid;
  let menuTypes = [];
  getMenuTypes ()
    .then (res => {
      console.log (res);
      res.forEach (doc => {
        // console.log(doc.data());
        menuTypes.push (doc.id);
      });

      let newArr = menuTypes.map (menu => {
        return {
          menuType: menu,
          menuOwner: id,
        };
      });

      newArr.forEach (menu => {
        createMenu (menu)
          .then (res => {
            console.log (res);
          })
          .catch (err => {
            console.log (err);
          });
      });
         console.log ('menus to make', newArr);
      //  console.log('Schedule types', schTypes);
    })
    .catch (err => {
      console.log (err);
    });
};
