import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getMenuTypes = async () => {
  return await firestore ().collection ('menuTypes').get ();
};

export const createMenu = menuObj => {
  return firestore ().collection ('dailyMenu').add (menuObj);
};
