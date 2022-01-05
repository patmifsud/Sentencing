import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import gmService from '../../services/gameService.js';
import playerService from '../../services/playerService.js';
import animations from "../../services/animations.js"
import './phases.css';

// rotate editor

function Scoreboard({data}) {
   const [managingRoundEnd, setManagingRoundEnd] = useState(false);

   useEffect(() => {
      if (data.player && 
          data.player.isHost && 
          !managingRoundEnd){
            manageRoundEnd();
      }
   }, [data.player])
  
    async function manageRoundEnd(){
      setManagingRoundEnd(true);
      try {
         gmService.updateStoryWithWinningSentence(data)
         .then(() => {
            playerService.addPoint(data, data.wonSentence.playerNo)
            .then(() => {
               gmService.dbIncrementRound(data)
               .then(() => {
                  setTimeout(async () => {
                     gmService.dbSetAllPlayersReady(data, true);
                  }, 4000);
               });
            });
         })
      } catch (err) {
         setManagingRoundEnd(false);
         console.log(err);
      }
    }

   return (
      <motion.div 
      className="scoreboard phase-container" 
      variants={animations.phaseContainer}
      initial="hide"
      animate="show"
      >
         <h3>Scoreboard</h3>
      </motion.div>
      );
    }

export default Scoreboard;