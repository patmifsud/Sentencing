
// Game 
// takes care of swapping out game phase components
// and managing the states of the game (phases)

import React, { useState, useEffect } from "react"

import gmService from "../services/gameService.js"
import playerService from "../services/playerService.js" 
import {startFBSnapshots} from "../services/firebase.js"

import TestPannel from "./ui/TestPannel"
import PlayerDrawer from "./ui/playerDrawer/PlayerDrawer"
import {
   Loading, Lobby, Intro, RoundStart, Write, Vote, Reveal, Scoreboard, End
} from "./gamePhases/_gamePhaseIndex.js";

function Game(props) {
   const gameId = props.urlParams.toString()

   const [currentPhase, setCurrentPhase] = useState('Loading');
   const [players, setPlayers] = useState([]);
   const [player, setPlayer] = useState(null);
   const [playerNo, setPlayerNo] = useState(null) //-1 = spectator
   const [round, setRound] = useState(1);
   const [gameLength, setGameLength] = useState(4);
   const [color, setColor] = useState('grey');

   const [story, setStory] = useState([]);
   const [sentenceCache, setSentenceCache] = useState([]);
   const [wonSentence, setWonSentence] = useState([]);

   let states = {
      players, player, playerNo, round, story, sentenceCache, wonSentence, gameId, currentPhase, color, setPlayerNo
   }

   const ps = playerService

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
         setSentenceCache,
         gameId
      )
      // TODO?
      // https://firebase.google.com/docs/firestore/query-data/listen#detach_a_listener
   }, []);

   function setPlayerOrder() {
      if (players.length){
         if (ps.isExistingPlayer(states)) {
            const thisPlayerNo = ps.getLocalPlayerPosition(states)
            setPlayerNo(thisPlayerNo);
            setPlayer(players[playerNo]);
         } else {
            console.log('Could not find player in players array');
            setPlayerNo(-1); //spectator, or lobby component will handle
         }
      } 
   }

   function phaseHandler() {
      if (
         playerNo > -1 &&
         players.length > 0 && 
         players[playerNo] &&
         players[playerNo].isHost && 
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
      setPlayerOrder();
   }, [players, playerNo]);

   useEffect(() => {
      setColor(ps.getPlayerColor(playerNo));
   }, [playerNo]);

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
