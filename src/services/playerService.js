import { db } from "./firebase.js";
import firebase from "firebase";
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator'

const playerService = {

  mintNewPlayer: function(gameCode, player, onSuccess, playerNo) {
    db.collection("games").doc(gameCode)
    .collection("players").doc(`${playerNo}`)
    .set(Object.assign({}, player))
    .then(function () {
      localStorage.setItem("localId", player.localId); 
      return onSuccess();
    })
  },

  isExistingPlayer: function(gameData) {
    const localId = localStorage.getItem("localId");
    const thisPlayer = gameData.players.findIndex(p => p.localId === localId);
    if (thisPlayer > -1) {
      return true;
    } return  false
  },

  isHost: function(gameData) {
    if ( gameData &&
      gameData.playerNo === 0
    ) return true;
    return false;
  },

  getLocalPlayerPosition: function(gameData) {
    const localId = localStorage.getItem("localId");
    const thisPlayer = 
      gameData.players.findIndex(p => p.localId === localId);
    return gameData.players[thisPlayer].playerNo;
  },

  hasPlayersArrayLoaded: function(gameData){
    if (
      gameData.players && 
      gameData.players.length > 0
    ) return true
    return false
  },

  isPlayerSpectator: function(gameData){
    if (
      gameData.playerNo === -1
    ) return true
    return false
  },

  isPlayerInState: function(gameData){
    if (
      gameData.playerNo &&
      gameData.playerNo > -1
    ) return true
    return false
  },

  addLocalPlayerToState: function(gameData, position){
    console.log(
      localStorage.getItem("localId"), 
        " is an existing player"
    );
    gameData.setPlayerNo(position);
  },

  updateName : function(player, newName, gameData){
    if (newName.length > 0) {
      db.collection("games").doc(gameData.gameId)
      .collection("players").doc(`${player}`)
      .update({ name: newName})
      .then(function(){ return true })
      .catch(function(){ return false;}
      )
    } else return false;
  },

  getPlayerColor: function(playerNo, tint=""){
    const colors = [
      'p1_Orange', 'p2_Blue', 'p3_Yellow', 'p4_Purple', 'green', 'cyan', 'pink', 'p1_Orange', 'p2_Blue', 'p3_Yellow', 'p4_Purple', 'green', 'cyan', 'pink'
    ];
    if (playerNo > -1) {
      return colors[playerNo] + tint;
    } else return 'grey' + tint;
  },

  createRemainingPlayerNames: function(gameData){
    gameData.players.forEach(player => {
      if (!player.name) {
        const ramdomName = uniqueNamesGenerator({
          dictionaries: [adjectives, animals],
          separator: ' ',
        }); 
        this.updateName(
          player.playerNo, ramdomName, gameData
        )
      }
    })
  },

  makeRandomId: function(){
    return Math.random().toString(36).substring(2, 15) 
    + Math.random().toString(36).substring(2, 15);
  },

  addPoint: async function(gameData, playerNo){
    console.log('adding point to player', playerNo);
    db.collection("games").doc(gameData.gameId)
    .collection("players").doc(`${playerNo}`)
    .update({ score: firebase.firestore.FieldValue.increment(1)})
    .then(function(){ return true })
    .catch(function(){ return false;}
    )
  }

}

export default playerService;
