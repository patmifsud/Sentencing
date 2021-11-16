
import {db} from "./firebase.js"

// ------------------------------------------------------------------------------
// functions that controll the flow of the game
// s = game states 
  // { players, playerId, round, story, tempSentences, wonSentence, gameId, currentPhase }

const gmService = {
  
  dbSetPlayerReady: function(s, bool){
    console.log("gmService.dbSetPlayerReady()")
    console.log(s)
      const playerIdStr = String(s.playerId)
      db.collection("games")
      .doc(s.gameId)
      .collection("players")
      .doc(playerIdStr)
      .update({ ready: bool });
  },

  dbSetAllPlayersReady: function(s, bool) {
      for (let i = 0; i < s.players.length; i++) {
        db.collection("games").doc(s.gameId)
        .collection("players")
        .doc(String(i))
        .update({ ready: bool });
      }
  },

  dbSetGamePhase: function(s, newPhase) {
      db.collection("games")
      .doc(s.gameId)
      .update({ currentPhase: newPhase });
  },

  checkAllPlayersReady: function(s, bool) {
      for (let i = 0; i < s.players.length; i++) {
        if (s.players[i].ready !== bool) return false};
      return true;
  },

  checkIfEndGame: function(s, gameLength) {
      if (s.currentPhase === "Scoreboard" && 
        s.round >= gameLength) {
          return true
      } return false
  },
}

export default gmService;

