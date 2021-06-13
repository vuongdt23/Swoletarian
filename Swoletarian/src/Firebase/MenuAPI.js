import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {getFoodbyID, getFoodsbyIDarr} from './foodAPI';
export const getMenuTypes = async () => {
  return await firestore ().collection ('menuTypes').get ();
};

export const createMenu = menuObj => {
  return firestore ().collection ('dailyMenu').add (menuObj);
};
export const getMenubyCurrentUser = async () => {
  const userID = auth ().currentUser.uid;

  return await firestore ()
    .collection ('menu')
    .where ('menuOwner', '==', userID)
    .get ();
};

export const uploadMenuDetails = detailArr => {
  detailArr.forEach (detail => {
    firestore ()
      .collection ('menuDetails')
      .add (detail)
      .then (res => console.log (res))
      .catch (err => {
        console.log (err);
      });
  });
};

export const getMenuDetailsfromMenu = async menuID => {
  return await firestore ()
    .collection ('menuDetails')
    .where ('menuID', '==', menuID)
    .get ();
};
