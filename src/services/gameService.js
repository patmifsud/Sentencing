
import {db} from "./firebase.js"
import firebase from "firebase";


// ------------------------------------------------------------------------------
// functions that controll the flow of the game
// s = game states 
  // { players, playerNo, round, story, tempSentences, wonSentence, gameId, currentPhase }

const gmService = {
  dbSetPlayerReady: function(s, bool){
      const playerNoStr = String(s.playerNo)
      db.collection("games")
      .doc(s.gameId)
      .collection("players")
      .doc(playerNoStr)
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

  async dbIncrementRound(s) {
    await db.collection("games")
      .doc(s.gameId)
      .update({ round: firebase.firestore.FieldValue.increment(1) })
      .then(() => { return true })
      .catch((e) => {throw new Error(e)});
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

  async addToSentenceCache(s, sentence) {
    const newSentenceId = s.sentenceCache.length
    await db.collection("games")
    .doc(s.gameId)
    .collection("sentenceCache")
    .doc(newSentenceId.toString())
    .set({ 
      text : sentence, 
      playerNo : s.playerNo,
      playerName : s.player.name,
      votes: 0
    }) 
    .then(() => {return true})
    .catch((e) => {throw new Error(e)});
  },

  async voteForSentence(s, sentenceIndex) {
    await db.collection("games")
    .doc(s.gameId)
    .collection("sentenceCache")
    .doc(sentenceIndex.toString())
    .update({ 
      votes: firebase.firestore.FieldValue.increment(1) 
    })
    .then(() => {return true})
    .catch((e) => {throw new Error(e)});
  },

  async setWinningSentence(s) {
    // finds the sentence with the most votes. 
    // In the case of a tie, i assume it takes the first submitted eg. 
    let winningSentence = 
      s.sentenceCache.reduce((max, sentence) => 
        max.votes > sentence.votes ? max : sentence
      );
    await db.collection("games")
    .doc(s.gameId)
    .update({ 
      wonSentence : winningSentence,
    }) 
    .then(() => {return true})
    .catch((e) => {throw new Error(e)});
  },

  async updateStoryWithWinningSentence(s) {
    console.log('hi')
    const updatedStory = s.story.concat(s.wonSentence)

    await db.collection("games")
    .doc(s.gameId)
    .update({
      story : updatedStory,
    })
    .then(() => {
      this.dbClearSentenceCache(s); 
      return true;
    })
    .catch((e) => {throw new Error(e)});
  },

  dbClearSentenceCache: function(s) {
    db.collection("games")
      .doc(s.gameId)
      .collection("sentenceCache")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
      });
    });
  },

  //for testing or misc edgecases
  dbAddTempStory: function(s, story){
    console.log("adding temp story data")
    db.collection("games")
    .doc(s.gameId)
    .update({ story: story });
  },

}

export default gmService;

