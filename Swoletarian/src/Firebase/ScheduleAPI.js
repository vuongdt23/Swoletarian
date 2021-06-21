import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getScheduleTypes = async () => {
  return await firestore().collection('scheduleTypes').get();
};

export const createSchedule = schObj => {
  return firestore().collection('workoutSchedules').add(schObj);
};

export const getSchedulesbyUser = async () => {
  const id = auth().currentUser.uid;
  return await firestore()
    .collection('workoutSchedules')
    .where('scheduleOwner', '==', id)
    .get();
};

export const createScheduleDetail = scheduleDetail => {
  return firestore().collection('workoutScheduleDetails').add(scheduleDetail);
};

export const createScheduleDetailfromParams = (
  scheduleID,
  exerciseID,
  rep,
  set,
) => {
  let detailObj = {
    schedule: scheduleID,
    exercise: exerciseID,
    rep: rep,
    set: set,
  };
  return firestore().collection('workoutScheduleDetails').add(detailObj);
};

export const getScheduleDetailsbySchedule = async scheduleID => {
  return await firestore()
    .collection('workoutScheduleDetails')
    .where('scheduleID', '==', scheduleID)
    .get();
};

export const deleteScheduleDetail = scheduleDetailID => {
  return firestore()
    .collection('workoutScheduleDetails')
    .doc(scheduleDetailID)
    .delete();
};

export const getDefautSchedulesbyName = scheduleName => {
  return firestore()
    .collection('workoutSchedules')
    .where('scheduleName', '==', scheduleName)
    .get();
};

export const clearCurrentUserSchedule = async () => {
  await getSchedulesbyUser()
    .then(res => {
      res.forEach(doc => {
        firestore()
          .collection('workoutScheduleDetails')
          .where('scheduleID', '==', doc.id)
          .get()
          .then(result => {
            let batch = firestore().batch();
            result.forEach(docu => {
              batch.delete(docu.ref);
            });
            return batch.commit();
          })
          .catch(err => {
            console.log(err);
          });
      });
    })
    .catch(err => {
      console.log(err);
    });
};
