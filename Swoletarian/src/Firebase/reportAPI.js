import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const getCaloriesGainRecapByCurrentUser = async () => {
  const userID = auth().currentUser.uid;
  return await firestore()
    .collection('dailyCaloriesGainRecaps')
    .where('gainRecapOwner', '==', userID)
    .get();
};

export const getCaloriesGainRecapBByCurrentUser = async () => {
  const userID = auth().currentUser.uid;
  return await firestore()
    .collection('dailyCaloriesBurnRecaps')
    .where('burnRecapOwner', '==', userID)
    .get();
};

export const uploadGainRecap = gainRecapObj => {
  return firestore().collection('dailyCaloriesGainRecaps').add(gainRecapObj);
};
export const uploadBurnRecap = burnRecapObj => {
  return firestore().collection('dailyCaloriesBurnRecaps').add(burnRecapObj);
};

export const getTodaysGainRecapByUser = async () => {
  const userID = auth().currentUser.uid;
  let midnightToday = new Date();
  midnightToday.setHours(0, 0, 0, 0);

  return await firestore()
    .collection('dailyCaloriesGainRecaps')
    .where('gainRecapOwner', '==', userID)
    .where('gainRecapDate', '<', new Date())
    .where('gainRecapDate', '>=', midnightToday)
    .get();
};
export const getTodaysBurnRecapByUser = async () => {
  const userID = auth().currentUser.uid;
  let midnightToday = new Date();
  midnightToday.setHours(0, 0, 0, 0);

  return await firestore()
    .collection('dailyCaloriesBurnRecaps')
    .where('burnRecapOwner', '==', userID)
    .where('burnRecapDate', '<', new Date())
    .where('burnRecapDate', '>=', midnightToday)
    .get();
};
