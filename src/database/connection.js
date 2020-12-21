var firebase = require("firebase");

var firebaseConfig = {
    apiKey: process.env.NODE_ENV_FIREBASE_API_KEY,
    authDomain: "surfy-8e145.firebaseapp.com",
    databaseURL: "https://surfy-8e145-default-rtdb.firebaseio.com",
    projectId: "surfy-8e145",
    storageBucket: "surfy-8e145.appspot.com",
    messagingSenderId: "39905859463",
    appId: "1:39905859463:web:485a5f7e13915b9a83e522"
};
firebase.initializeApp(firebaseConfig);


var db = firebase.database();

module.exports = db;