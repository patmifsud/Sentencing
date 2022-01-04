
// only shown in dev environment

import React, { useState } from "react"
import gmService from "../../services/gameService.js"

// players, playerNo, round, story, tempSentences, wonSentence, gameId
// dbSetPlayerReady, dbSetAllPlayersReady, dbSetGamePhase, checkAllPlayersReady

function TestPannel(props) {
   const [pannelClosed, setPannelClosed] = useState(true);

   return (
      <div className="testPannel">
         { pannelClosed ? 
            ' ' 
         :
            <>
               <p> <b>Game id</b> is <br/>{props.data.gameId}</p>
               <p> <b>Player id</b> is <br/>{props.data.playerNo}</p>
               <p> <b>Current phase:</b> <br/>{props.data.currentPhase}</p>
               {/* <p> <b>Round:</b>  /  </p> */}
               <br/>
               <p> <b>Console log:</b> </p>
               <button onClick={() => {console.log(props.data.story)}} > Story </button>
               <button onClick={() => {console.log(props.data.sentenceCache)}} > sentenceCache</button>
               <button onClick={() => {console.log(props.data.wonSentence)}} > wonSentence</button>
               <button onClick={() => {console.log(props.data.players)}} > All player data </button>
               <button onClick={() => {console.log(props.data.player)}} > player</button>

               <br />
               <p> <b>Actions:</b> </p>

               <button onClick={() => {
                  gmService.dbSetPlayerReady(
                     props.data, 
                     true
                  )
               }}> Set me to ready 
               </button>

               <button onClick={() => {
                  gmService.dbSetAllPlayersReady(
                     props.data, 
                     true
                  )}} > 
                  Set all to ready
               </button>

               <button onClick={() => {
                  gmService.dbSetGamePhase(
                     props.data, 
                     'Intro'
                  )}} > 
                  Back to Intro 
               </button>

               <button onClick={() => {
                  gmService.dbSetGamePhase(
                     props.data, 
                     'Lobby'
                  )}} > 
                  Back to Lobby 
               </button>

               <button onClick={() => {
                  gmService.dbAddTempStory(
                     props.data,
                     [{
                        text: 'Once upon a time',
                        playerNo: 0,
                        playerName: 'fakeplayername'
                     },
                     {
                        text: 'there was a text story',
                        playerNo: 1,
                        playerName: 'fakeplayername'

                     },
                     {
                        test: 'and then there was a test story',
                        playerNo: 0,
                        playerName: 'fakeplayername'

                     }
                     ])
               }} 
               > generate temp story 
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
