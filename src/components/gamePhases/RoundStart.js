import React, { useEffect } from 'react';
import { motion } from 'framer-motion'
import gmService from '../../services/gameService';
import animations from "../../services/animations.js"
import './phases.css';


function RoundStart({data}) {

  useEffect(() => {
    setTimeout(() => {
      gmService.dbSetPlayerReady(
        data, true
      );
    }, 4000);
  }, [])

  return (
      <motion.div 
        className="round-start phase-container" 
        variants={animations.phaseContainer}
        initial="hide"
        animate="show"
      >
        <h3>Round {data.round}</h3>
      </motion.div>
    );
  }



export default RoundStart;