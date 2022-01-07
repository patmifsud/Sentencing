import firebase from "firebase";
import { db } from "./firebase.js";
import Player from '../models/player.js';
import playerService from './playerService.js';



async function createNewGame(gameCode, setStartingGame, setGameCodeError) {
  const dbPath = db.collection("games").doc(gameCode)
  const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  
  await dbPath.set({ // create a new game
      story: [],
      round: 1,
      currentPhase: "Lobby",
      wonSentence: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(function () { // create a new user
      const localId = localStorage.getItem("localId") || randomId;
      localStorage.setItem("localId", localId); 

      const initalPlayers = [
        new Player(null, 0, true, false, localId, false, 0),
        // new Player('Bot 1', 1, false, false, playerService.makeRandomId(), true, 0),
      ]

      playerService.mintNewPlayers(
        gameCode, initalPlayers
      ).then(() => {
        window.location.href = gameCode;
      })
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
      setStartingGame(false);
      setGameCodeError(true);
      // show error to user
    });
}

export { createNewGame };
