import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCsUq7vDRNqXnIOsbpynheV7kEZgSNA59E",
  authDomain: "sentencing-game.firebaseapp.com",
  projectId: "sentencing-game",
  storageBucket: "sentencing-game.appspot.com",
  messagingSenderId: "975026243279",
  appId: "1:975026243279:web:f33cf82088587a1b3a59ba",
  measurementId: "G-B0EV8XRGQD",
});

const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

// ----------------------------------------------
// 🔥  Firebase snapshots / gets
// https://firebase.google.com/docs/firestore/query-data/listen


// 📅  update 'currentPhase' and 'wonSentence'
// in game state when 'phase' changes in db
function startGameFieldsSnapshot(setCurrentPhase, setWonSentence, gameId) {
  console.log("Started startGameFieldsSnapshot");
  db.collection("games")
    .doc(gameId)
    .onSnapshot(
      (snapshot) => {
        setCurrentPhase(snapshot.data().currentPhase);
        setWonSentence(snapshot.data().wonSentence);
      },
      (error) => {
        console.error("startGameFieldsSnapshot failed: ", error);
      }
    );
}

// 👤 update 'players' data in game state when 'players' changes in db
function startPlayersSnapshot(setPlayers, gameId) {
  console.log("Started PlayersSnapshot");
  db.collection("games")
    .doc(gameId)
    .collection("players")
    .onSnapshot(
      function (querySnapshot) {
        let allPlayers = [];
        if (querySnapshot.docs.length > 0) {
          querySnapshot.docs.forEach((doc) => {
            allPlayers.push(doc.data());
          });
          setPlayers(allPlayers);
        } else console.log("No players yet");
      },
      (error) => {
        console.error("startPlayersSnapshot failed: ", error);
      }
    );
}

// 📖 update 'story' in game state when 'story' changes in db
function startStorySnapshot(setStory, gameId) {
  console.log("Started startStorySnapshot");
  db.collection("games")
    .doc(gameId)
    .collection("story")
    .onSnapshot(
      function (querySnapshot) {
        let allStories = [];
        if (querySnapshot.docs.length > 0) {
          querySnapshot.docs.forEach((doc) => {
            allStories.push(doc.data());
          });
          setStory(allStories);
        } else console.log("No stories yet");
      },
      (error) => {
        console.error("startStorySnapshot failed: ", error);
      }
    );
}

// 💬 update 'sentence' in game state when 'story' changes in db
function startSentencesSnapshot(setTempSentences, gameId) {
  console.log("Started startSentencesSnapshot");
  db.collection("games")
    .doc(gameId)
    .collection("sentences")
    .onSnapshot(
      function (querySnapshot) {
        let allSentences = [];
        if (querySnapshot.docs.length > 0) {
          querySnapshot.docs.forEach((doc) => {
            allSentences.push(doc.data());
          });
          setTempSentences(allSentences);
        }
      },
      (error) => {
        console.error("startSentencesSnapshot failed: ", error);
      }
    );
}

// collecting all functions in one parent function
// for less verbose passthrough
function startFBSnapshots(
  setCurrentPhase,
  setWonSentence,
  setPlayerId,
  setStory,
  setRound,
  setTempSentences,
  gameId
) {
  startGameFieldsSnapshot(setCurrentPhase, setWonSentence, gameId);
  startPlayersSnapshot(setPlayerId, gameId);
  startStorySnapshot(setStory, gameId);
  startSentencesSnapshot(setTempSentences, gameId);
}

export { db, auth, startFBSnapshots};
