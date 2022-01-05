import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { Box }  from '@chakra-ui/react'
import animations from "../../services/animations.js"
import gmService from '../../services/gameService.js';

import './phases.css';

function Reveal({data}) {
  const [settingWonSentence, setSettingWonSentence] = useState(false);

  useEffect(() => {
    if (!settingWonSentence) setWinningSentence();
  }, [data.player])

  async function setWinningSentence(){
    if (data.player && data.player.isHost){
      setSettingWonSentence(true);
      try {
        gmService.setWinningSentence(data)
        .then(() => {
          setTimeout(async () => {
              gmService.dbSetAllPlayersReady(data, true);
            })
          }, 4000);
      } catch (err) {
        setSettingWonSentence(false);
        console.log(err);
      }
    }
  }

  return (
    <motion.div 
      className="reveal phase-container" 
      variants={animations.phaseContainer}
      initial="hide"
      animate="show"
    >
      <motion.div variants={animations.childAnimations}>
        <Box bg="gray.700" w="100%" mb={5} px={4} py={2} fontSize="xl">
          and the winner is: 
        </Box>
      </motion.div>

      <motion.div variants={animations.childAnimations}>
        <Box bg="gray.700" w="100%" mb={5} px={4} py={2} fontSize="xl">
          <p> {data.wonSentence ? data.wonSentence.text : '🥁'}</p>
        </Box>
      </motion.div>
    
    </motion.div>
  );
  }

export default Reveal;