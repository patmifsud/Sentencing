
// Game component
// takes care of swapping out game phase components
// and managing the states of the game

import React, { useState, useEffect } from "react"
import {db, startFBSnapshots} from "../services/firebase.js"

import TestPannel from "./TestPannel"

import {
   Loading,Lobby,RoundStart,Intro,Write,Vote,Reveal,Scoreboard,End
 } from "./gamePhases/allPhases";


function Game(props) {
   const [currentPhase, setCurrentPhase] = useState('Loading');
   const [players, setPlayers] = useState([]);
   const [playerId, setPlayerId] = useState(0)
   const [round, setRound] = useState(1);
   const [gameLength, setGameLength] = useState(4);

   const [story, setStory] = useState([]);
   const [tempSentences, setTempSentences] = useState([]);
   const [wonSentence, setWonSentence] = useState([]);

   const gameId = props.urlParams.toString()

   let gameStates = {
      players, playerId, round, story, tempSentences, wonSentence, gameId, currentPhase
   }

   // 💡 if performance is an issue, could break out which states to passthrough
   // to child components in this table also, minimising updates triggered by
   // listened state changes
   const gamePhases = {
      'Loading': {obj: Loading, nextPhase: 'Lobby'},
      'Lobby': {obj: Lobby, nextPhase : 'Intro'},
      'Intro': {obj: Intro, nextPhase: 'RoundStart'},
      'RoundStart': {obj: RoundStart, nextPhase: 'Write'},
      'Write': {obj: Write, nextPhase : 'Vote'},
      'Vote': {obj: Vote, nextPhase : 'Reveal'},
      'Reveal': {obj: Reveal, nextPhase : 'Scoreboard'},
      'Scoreboard': {obj: Scoreboard, nextPhase : 'RoundStart'},
      'End': {obj: End, nextPhase : 'Intro'},
   }

   // ------------------------
   // 🔥 Start Firebase snapshots
   useEffect(() => {

      startFBSnapshots(
         setCurrentPhase, 
         setWonSentence,
         setPlayers,
         setStory,
         setRound,
         setTempSentences,
         gameId
      )
      // TODO?
      // https://firebase.google.com/docs/firestore/query-data/listen#detach_a_listener
   }, []);


   // ------------------------
   // Manage game phases

   function dbSetPlayerReady(playerId, bool){
      const playerIdStr = String(playerId)
      db.collection("games").doc(gameId).collection("players")
      .doc(playerIdStr).update({ ready: bool });
   }

   function dbSetAllPlayersReady(bool) {
      for (let i = 0; i < players.length; i++) {
         db.collection("games").doc(gameId).collection("players")
         .doc(String(i)).update({ ready: bool });
      }
   }

   function dbSetGamePhase(newPhase){
      db.collection("games").doc(gameId)
      .update({ currentPhase: newPhase });
   }

   function checkAllPlayersReady(bool) {
      for (let i = 0; i < players.length; i++) {
        if (players[i].ready !== bool) return false};
      return true;
   }

   function checkIfEndGame(){
      if (currentPhase === "Scoreboard" && 
         round >= gameLength) {
            return true
      } return false
   }

   function phaseHandler() {
      if (players.length > 0 && 
          players[playerId].isHost && 
          checkAllPlayersReady(true)){
            if (checkIfEndGame()) {
               dbSetGamePhase("End")} 
            else {
               const nextPhase = gamePhases[currentPhase].nextPhase
               dbSetGamePhase(nextPhase)}

         dbSetAllPlayersReady(false);
   }}
  

   // Everytime player data changes, check if all players ready
   // If they are, and user is host, set db game phase to next phase
   useEffect(() => { 
      phaseHandler();
   }, [players]);


  return (
    <div>
      {React.createElement(
         gamePhases[currentPhase].obj, { 
            data: gameStates, 
            action: {dbSetPlayerReady}
         },
      )}

      {/* Test pannel, only visible on local */}
      {process.env.NODE_ENV === 'development' ? 
         <TestPannel data={gameStates} 
            dbSetPlayerReady={dbSetPlayerReady} 
            dbSetAllPlayersReady={dbSetAllPlayersReady}
            dbSetGamePhase={dbSetGamePhase}
          /> 
         : ' '
      }
   </div>
  );
}

export default Game;
