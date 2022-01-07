import { db } from "./firebase.js";
import firebase from "firebase";
import Player from "../models/player.js";
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator'

const playerService = {

  mintNewPlayer: async function(gameCode, player, playerNo) {
    db.collection("games").doc(gameCode)
    .collection("players").doc(`${playerNo}`)
    .set(Object.assign({}, player))
    .then(() => {return true});
  },

  mintNewPlayers: async function(gameCode, players) {
    players.forEach(async (player, index) => {
      this.mintNewPlayer(gameCode, player, index)
      .then(() => {
        if (index === players.length - 1) {
          return true;
        }
      })
    });
  },

  // removePlayer: async function(gameCode, playerNo) {
  //   //shouldn't use this as it causes issues with playerNos.
  //   //since we use the no of the player in the array to index the player
  //   //we cant remove players from the array.
  //   db.collection("games").doc(gameCode)
  //   .collection("players").doc(`${playerNo}`)
  //   .delete()
  //   .then(function () {
  //     console.log("Player deleted: ", playerNo);
  //   })
  //   .catch(function (error) {
  //     console.error("Error deleteing player: ", error);
  //   });
  // },

  isExistingPlayer: function(gameData) {
    const localId = localStorage.getItem("localId");
    console.log('local id: ', localId);

    const thisPlayer = gameData.players.findIndex(p => p.localId === localId);
    console.log('this player: ', thisPlayer);
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
  },

  howManyPlayersAreBots: function(gameData){
    if (gameData.players) {
      const players = gameData.players;
      const botCount = players.filter(player => player.isBot).length;
      console.log(botCount)
      return botCount;
    }
  },

  addOrRemoveBots: async function(gameData, from, to){
    const botDiff = to - from;
    if (botDiff > 0) {
      for (let i = 0; i < botDiff; i++) {
        this.createBotPlayer(gameData);
      }
    } else if (botDiff < 0) {
      console.error("removing bots isn't supported")
      // for (let i = 0; i > botDiff; i--) {
      //   this.removeBotPlayer(gameData);
      // }
    }
  },

  createBotPlayer: function(gameData){
    const playerNo = gameData.players.length;
    const localId = this.makeRandomId();
    const player = new Player(`Bot ${playerNo}`, playerNo, false, false, localId, true, 0);
    console.log('gameData.players.length', gameData.players.length);
    this.mintNewPlayer(
      gameData.gameId, player, playerNo
    )
  },

  // since we're using player position, removing bots isn't possible atm
  // removeBotPlayer: async function(gameData){
  //   const player = gameData.players.find(p => p.isBot);

  //   if (player) {
  //     db.collection("games")
  //     .doc(gameData.gameId)
  //     .collection("players")
  //     .doc(`${player.playerNo}`)
  //     .delete()
  //     .then(function(){ return true })
  //     .catch(function(){ return false;}
  //     )
  //   }
  // },
}

export default playerService;
