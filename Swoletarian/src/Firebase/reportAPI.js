import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const getCaloriesRecapByCurrentUser = async () => {
  const userID = auth ().currentUser.uid;
  return await firestore ()
    .collection ('dailyCaloriesRecap')
    .where ('caloriesRecapOwner', '==', userID)
    .get ();
};

export const getWorkoutRecapByCurrentUser = async () => {
  const userID = auth ().currentUser.uid;
  return await firestore ()
    .collection ('workoutRecaps')
    .where ('recapOwner', '==', userID)
    .get ();
};

