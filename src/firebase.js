import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDnahF6gnBJnS6jI42PvdGb3jPswwF27Xw",
    authDomain: "jeang-covid-tracker.firebaseapp.com",
    projectId: "jeang-covid-tracker",
    storageBucket: "jeang-covid-tracker.appspot.com",
    messagingSenderId: "941721671828",
    appId: "1:941721671828:web:f662f89070f02d43b93c81",
    measurementId: "G-4S6XRR9XL7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig); // init firebaseApp

const db = firebaseApp.firestore(); // use firebaseApp to connect to firestore -> store as db

export default db; // can be imported in anywhere in react app -> get access to db