import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
<<<<<<< HEAD

export const addExercise = exercise => {
  return firestore ().collection ('exercises').add (exercise);
};

export const getExercisesbyCurrentUser = async () => {
  const userID = auth ().currentUser.uid;

  return await firestore ()
    .collection ('exercises')
    .where ('exerciseOwner', '==', userID)
    .get ();
};

export const getExercisebyID = async exerciseID => {
  return await firestore ().collection ('exercises').doc (exerciseID).get ();
};

export const getExercisebyMenu = async menuID => {
  //
};

export const deleteExercise = async exerciseID => {
  return await firestore ().collection ('exercises').doc (exerciseID).delete ();
};

export const getExerciseTypes = async () => {
  return await firestore ().collection ('excerciseTypes').get ();
=======
export const addExercise = exercise => {
  return firestore().collection('exercises').add(exercise);
};

export const getExercisesbyCurrentUser = async () => {
  const userID = auth().currentUser.uid;

  return await firestore()
    .collection('exercises')
    .where('exerciseOwner', '==', userID)
    .get();
};

export const getDefaultExercises = async () => {
  return await firestore()
    .collection('exercises')
    .where('exerciseOwner', '==', 'admin')
    .get();
};

export const getExercisebyID = async exerciseID => {
  return await firestore().collection('exercises').doc(exerciseID).get();
};

export const deleteExercise = async exerciseID => {
  return await firestore().collection('exercises').doc(exerciseID).delete();
};

export const getExerciseTypes = async () => {
  return await firestore().collection('excerciseTypes').get();
>>>>>>> 86d65a33621de1ff6f1d3d94f6bba38d66d8ec17
};
