import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCsUq7vDRNqXnIOsbpynheV7kEZgSNA59E",
  authDomain: "sentencing-game.firebaseapp.com",
  projectId: "sentencing-game",
  storageBucket: "sentencing-game.appspot.com",
  messagingSenderId: "975026243279",
  appId: "1:975026243279:web:f33cf82088587a1b3a59ba",
  measurementId: "G-B0EV8XRGQD"
})







const auth = firebaseApp.auth()
const db   = firebaseApp.firestore()

export {db , auth}
