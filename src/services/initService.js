import firebase from "firebase";
import { db } from "./firebase.js";
import Player from '../models/player.js';
import playerService from './playerService.js';


async function createNewGame(gameCode, setStartingGame, setGameCodeError) {
  const dbPath = db.collection("games").doc(gameCode)
  const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  
  await dbPath.set({ // create a new game
      story: [],
      roundCounter: 1,
      currentPhase: "Lobby",
      wonSentence: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(function () { // create a new user
      const localId = localStorage.getItem("localId") || randomId;
      const player = new Player(null, 0, true, false, localId, false, 0, "editor");
      const onSuccess = () => { 
        window.location.href = gameCode;
      }
      playerService.mintNewPlayer(
        gameCode, player, onSuccess, 0
      )
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
      setStartingGame(false);
      setGameCodeError(true);
      // show error to user
    });
}

export { createNewGame };
