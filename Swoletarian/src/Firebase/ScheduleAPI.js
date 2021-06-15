import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getScheduleTypes = async () => {
  return await firestore ().collection ('scheduleTypes').get ();
};

export const createSchedule = schObj => {
  return firestore ().collection ('workoutSchedules').add (schObj);
};

export const getSchedulesbyUser = async () => {
  const id = auth ().currentUser.uid;
  return await firestore ()
    .collection ('workoutSchedules')
    .where ('scheduleOwner', '==', id)
    .get ();
};

export const createScheduleDetail = scheduleDetail => {
  return firestore ()
    .collection ('workoutScheduleDetails')
    .add (scheduleDetail);
};

export const createScheduleDetailfromParams = (
  scheduleID,
  exerciseID,
  rep,
  set
) => {
  let detailObj = {
    schedule: scheduleID,
    exercise: exerciseID,
    rep: rep,
    set: set,
  };
  return firestore ().collection ('workoutScheduleDetails').add (detailObj);
};
