import firebase from "firebase";
import {db} from "./firebase.js"

async function createNewGame(
  gameCode, 
  setStartingGame, 
  setGameCodeError) {
    console.log("creating new game");
    console.log(gameCode);
    await db
      .collection("games")
      .doc(gameCode)
      //----------------------
      // create a new game
      .set({
        players: [],
        sentences: [],
        story: [],
        roundCounter: 1,
        currentPhase: "Lobby",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      //----------------------
      // create a new user
      .then(function () {
        db.collection("games")
          .doc(gameCode)
          .collection("players")
          .doc("0")
          .set({
            name: "hey",
            score: 0,
            isArbitrator: true,
            ready: false,
            isHost: true,
            id: 123,
            position: 0,
          })
          //----------------------
          // Navigate to the game
          .then(function () {
            console.log(`Game ${gameCode} created`);
            setTimeout(function () {
              
              window.location.href = `${gameCode}`;
            }, 500);
          });
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
        setStartingGame(false);
        setGameCodeError(true);
      }
    );
}

export { createNewGame };

