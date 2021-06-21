const {firestore} = require ('firebase-admin');
const schedule = require ('node-schedule');
const db = require ('./firestore');

const rule = new schedule.RecurrenceRule ();
rule.minute = 1;
rule.hour = 0;

const getUserList = async () => {
  let userList = [];

  await db
    .collection ('users')
    .get ()
    .then (res => {
      res.forEach (doc => {
        userList.push (doc.data ());
      });
    })
    .catch (err => {
      console.log (err);
    });

  // console.log (userList);
  return userList;
};

const checkUserNotActiveYesterday = async userID => {
  let yesterdayStart = new Date (Date.now () - 86400000);
  yesterdayStart.setHours (0, 0, 0, 0);
  let todayStart = new Date ();
  todayStart.setHours (0, 0, 0, 0);
  let result = false;
  await db
    .collection ('dailyCaloriesBurnRecaps')
    .where ('burnRecapOwner', '==', userID)
    .where ('burnRecapDate', '<', todayStart)
    .where ('burnRecapDate', '>', todayStart)
    .get ()
    .then (res => {
      if (res.empty) result = true;
    })
    .catch (err => {
      console.log (err);
    });
  return result;
};
getUserList ().then (res => {
  res.forEach (a => console.log (a));
});
checkUserNotActiveYesterday ('wvZII3pRpecWWHSldbCaKRRB82o2').then (res => {
  console.log (res);
});

scheduleUpdater = () => {
    let TDEE = 0;
  getUserList.then (res => {
    res.forEach (user => {
        switch(user.userType){
            case 'beginner'
        }
      checkUserNotActiveYesterday (user).then (res => {
        if (res) db.collection ('dailyCaloriesBurnRecaps').add ();
      });
    });
  });
};
