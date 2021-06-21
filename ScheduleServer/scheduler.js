const { firestore } = require("firebase-admin");
const schedule = require("node-schedule");
const db = require("./firestore");

const getUserList = async () => {
  let userList = [];

  await db
    .collection("users")
    .get()
    .then((res) => {
      res.forEach((doc) => {
        userList.push(doc.data());
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // console.log (userList);
  return userList;
};

const checkUserNotActiveYesterday = async (userID) => {
  let yesterdayStart = new Date(Date.now() - 86400000);
  yesterdayStart.setHours(0, 0, 0, 0);
  let todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  let result = false;
  await db
    .collection("dailyCaloriesBurnRecaps")
    .where("burnRecapOwner", "==", userID)
    .where("burnRecapDate", "<", todayStart)
    .where("burnRecapDate", ">", todayStart)
    .get()
    .then((res) => {
      if (res.empty) result = true;
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

scheduleUpdater = () => {
  getUserList().then((res) => {
    console.log("users", res);
    res.forEach((user) => {
      let TDEE = calculateTDEE(user);

      checkUserNotActiveYesterday(user.ownerID)
        .then((res) => {
          console.log("will update", res);
          if (res)
            db.collection("dailyCaloriesBurnRecaps")
              .add({
                burnRecapOwner: user.ownerID,
                burnbyExercises: 0,
                burnByTDEE: TDEE,
                burnRecapDate: new Date(),
              })
              .then((res) => console.log(res));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
};

calculateTDEE = (userInfo) => {
  switch (userInfo.userType) {
    case "beginner":
      Z = 1.55;
      break;
    case "intermediate":
      Z = 1.725;
      break;
    case "advanced":
      Z = 1.9;
      break;
  }
  let BMR = 0;
  if (userInfo.userSex === "male") {
    BMR =
      10 * userInfo.userWeight +
      6.25 * userInfo.userHeight -
      5 * userInfo.userAge +
      5;
  } else {
    BMR =
      10 * userInfo.userWeight +
      6.25 * userInfo.userHeight -
      5 * userInfo.userAge -
      161;
  }
  console.log("BMR", BMR, "Z", Z);
  return Math.round(BMR * Z);
};

const rule = new schedule.RecurrenceRule();
rule.minute = 1;
rule.hour = 0;
const job = schedule.scheduleJob(rule, scheduleUpdater);

console.log("scheduler running to update firestore :P");
