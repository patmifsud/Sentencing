
// takes care of routing and game state

import React, { useState, useEffect } from "react"
import { db, auth } from "../services/firebase.js"
import TestPannel from "./TestPannel"

import {
   Loading,Intro,Lobby,Write,Vote,Reveal,Scoreboard,End
 } from "./gamePhases/allPhases";

 const gamePhases = {
   'Loading': {obj: Loading, nextPhase: 'Intro'},
   'Intro': {obj: Intro, nextPhase: 'Lobby'},
   'Lobby': {obj: Lobby, nextPhase : 'Write'},
   'Write': {obj: Write, nextPhase : 'Vote'},
   'Vote': {obj: Vote, nextPhase : 'Reveal'},
   'Reveal': {obj: Reveal, nextPhase : 'Scoreboard'},
   'Scoreboard': {obj: Scoreboard, nextPhase : 'Write'},
   'End': {obj: End, nextPhase : 'Intro'},
}

function Game() {
   const [currentPhase, setCurrentPhase] = useState('Loading');
   const [players, setPlayers] = useState([]);
   const [playerId, setPlayerId] = useState('')

  return (
    <div className="App">
      {React.createElement(
         gamePhases[currentPhase].obj, { 
            data: [players, playerId] 
         },
      )}

   {process.env.NODE_ENV === 'development' ? 
      <TestPannel /> : ' '
   }
    </div>
  );
}

export default Game;
