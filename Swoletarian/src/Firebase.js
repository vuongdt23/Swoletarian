import  firebase from 'firebase';

const settings = {timestampsInSnapshots: true};

const config = {
 apiKey: "AIzaSyDkCbIolNP2gV-5NkiovHG_JFq49MlxvFo",
    authDomain: "swoletarian.firebaseapp.com",
    databaseURL: "https://swoletarian-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "swoletarian",
    storageBucket: "swoletarian.appspot.com",
    messagingSenderId: "917394744534",
    appId: "1:917394744534:web:fa874271bcd3edecff1577",
    measurementId: "G-BEPGC7Y5F2"
};
firebase.initializeApp(config);
firebase.firestore().settings(settings);
export default firebase;