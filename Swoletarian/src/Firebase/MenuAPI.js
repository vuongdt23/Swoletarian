import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {getFoodbyID, getFoodsbyIDarr} from './foodAPI';
export const getMenuTypes = async () => {
  return await firestore().collection('menuTypes').get();
};

export const createMenu = menuObj => {
  return firestore().collection('menu').add(menuObj);
};
export const getMenubyCurrentUser = async () => {
  const userID = auth().currentUser.uid;

  return await firestore()
    .collection('menu')
    .where('menuOwner', '==', userID)
    .get();
};

export const uploadMenuDetails = detailArr => {
  detailArr.forEach(detail => {
    firestore()
      .collection('menuDetails')
      .add(detail)
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
      });
  });
};

export const getMenuDetailsfromMenu = async menuID => {
  return await firestore()
    .collection('menuDetails')
    .where('menuID', '==', menuID)
    .get();
};

export const deleteMenuDetail = menuDetailID => {
  return firestore().collection('menuDetails').doc(menuDetailID).delete();
};

export const deleteMenuDetailsByFoodID = foodID => {
  getMenuDetailsfromFood(foodID)
    .then(res => {
      let batch = firestore().batch();
      res.forEach(doc => {
        batch.delete(doc.ref);
      });
      return batch.commit();
    })
    .catch(err => console.log(err));
};

export const getMenuDetailsfromFood = async foodID => {
  return await firestore()
    .collection('menuDetails')
    .where('foodID', '==', foodID)
    .get();
};
