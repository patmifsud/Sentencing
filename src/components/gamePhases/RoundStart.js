import React, { useEffect } from 'react';
import { motion } from 'framer-motion'
import gmService from '../../services/gameService';
import animations from "../../services/animations.js"
import './phases.css';


function RoundStart(props) {

  useEffect(() => {
    setTimeout(() => {
      gmService.dbSetPlayerReady(
        props.data, true
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
        <h3>Round {props.data.round}</h3>
      </motion.div>
    );
  }



export default RoundStart;