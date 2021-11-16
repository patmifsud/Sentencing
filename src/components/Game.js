
// Game 
// takes care of swapping out game phase components
// and managing the states of the game (phases)

import React, { useState, useEffect } from "react"
import { motion } from 'framer-motion'

import gmService from "../services/gmService.js"
import {db, startFBSnapshots} from "../services/firebase.js"

import TestPannel from "./ui/TestPannel"
import PlayerDrawer from "./ui/playerDrawer/PlayerDrawer"
import {
   Loading, Lobby, Intro, RoundStart, Write, Vote, Reveal, Scoreboard, End
   } from "./gamePhases/gamePhaseIndex";

function Game(props) {
   const gameId = props.urlParams.toString()

   const [currentPhase, setCurrentPhase] = useState('Loading');
   const [players, setPlayers] = useState([]);
   const [playerId, setPlayerId] = useState(0)
   const [round, setRound] = useState(1);
   const [gameLength, setGameLength] = useState(4);

   const [story, setStory] = useState([]);
   const [tempSentences, setTempSentences] = useState([]);
   const [wonSentence, setWonSentence] = useState([]);

   let states = {
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

   function phaseHandler() {
      if (
         players.length > 0 && 
         players[playerId].isHost && 
         gmService.checkAllPlayersReady(states, true)){
            if (gmService.checkIfEndGame(states, gameLength)) {
               gmService.dbSetGamePhase(states, "End")} 
            else {
               const nextPhase = gamePhases[currentPhase].nextPhase
               gmService.dbSetGamePhase(states, nextPhase)
            }
            gmService.dbSetAllPlayersReady(states, false);
      }
   }
   // ----------------
   // Everytime player data state changes, check if all players ready
   // If they are, and user is host, set 'currentPhase' in db to the next phase
   useEffect(() => { 
      phaseHandler();
   }, [players]);

  return (
    <div className="game-container">
      <PlayerDrawer data={states}/>

      {React.createElement(
         gamePhases[currentPhase].obj, { 
            data: states, 
            
         },
      )}

      {/* Test pannel, only visible on local */}
      {process.env.NODE_ENV === 'development' ? 
         <TestPannel data={states}/> 
         : ' '
      }
   </div>
  );
}

export default Game;
