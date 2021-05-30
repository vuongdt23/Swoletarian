import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export const addexercise = exercise => {
  return firestore().collection('exercises').add(exercise);
};

export const getExercisesbyCurrentUser = async () => {
  const userID = auth().currentUser.uid;

  return await firestore()
    .collection('excercises')
    .where('exerciseOwner', '==', userID)
    .get();
};

export const getExercisebyID = async exerciseID => {
  return await firestore().collection('exercises').doc(exerciseID).get();
};

export const getExercisebyMenu = async menuID => {
  //
};

export const deleteExercise = async exerciseID => {
  return await firestore().collection('exercises').doc(exerciseID).delete();
};

export const getExerciseTypes = async () => {
  return await firestore().collection('excerciseTypes').get();
};
