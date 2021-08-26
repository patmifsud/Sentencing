import React, { useState } from "react"

// players, playerId, round, story, tempSentences, wonSentence, gameId
// dbSetPlayerReady, dbSetAllPlayersReady, dbSetGamePhase, checkAllPlayersReady


function TestPannel(props) {
   const [pannelClosed, setPannelClosed] = useState(true);

   return (
   <div className="testPannel">
      { pannelClosed ? ' ' :
         <>
            <p> <b>Game id</b> is <br/>{props.data.gameId}</p>
            <p> <b>Player id</b> is <br/>{props.data.playerId}</p>
            <p> <b>Current phase:</b> <br/>{props.data.currentPhase}</p>
            {/* <p> <b>Round:</b>  /  </p> */}
            <br/>
            <p> <b>Console log:</b> </p>
            <button onClick={() => {console.log(props.data.story)}} > Story </button>
            <button onClick={() => {console.log(props.data.tempSentences)}} > tempSentences</button>
            <button onClick={() => {console.log(props.data.wonSentence)}} > wonSentence</button>
            <button onClick={() => {console.log(props.data.story)}} > All player data </button>
            <br />
            <p> <b>Actions:</b> </p>
            <button onClick={() => {console.log(typeof (props.data.playerId)); props.dbSetPlayerReady(
                  props.data.playerId, true)
               }} > Set me to ready 
            </button>
            <button onClick={() => {props.dbSetAllPlayersReady(true)}} > 
               Set all to ready
            </button>
            <button onClick={() => {props.dbSetGamePhase('Intro')}} > 
               Back to Intro 
            </button>
         </>
      } 
      <br />
      <br />
      <button 
         className="toggleButton"
         onClick={() => {
         setPannelClosed(!pannelClosed)}
         }>  + Test Pannel 
      </button>
   </div>
  );
}

export default TestPannel;
