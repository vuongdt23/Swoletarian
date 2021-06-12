import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const addFood = food => {
  return firestore().collection('foods').add(food);
};

export const getDefaultFoods = async () => {
  return await firestore()
    .collection('foods')
    .where('foodOwner', '==', 'admin')
    .get();
};
export const getFoodsbyCurrentUser = async () => {
  const userID = auth().currentUser.uid;

  return await firestore()
    .collection('foods')
    .where('foodOwner', '==', userID)
    .get();
};

export const getFoodbyID = async foodID => {
  return await firestore().collection('foods').doc(foodID).get();
};

export const getFoodbyMenu = async menuID => {
  //
};

export const deleteFood = async foodID => {
  return await firestore().collection('foods').doc(foodID).delete();
};

export const updateFood = async (foodID, modifiedFood) => {
  return await firestore().collection('food').doc(foodID).update(modifiedFood);
};
