import React from 'react';
import { motion } from 'framer-motion'
import animations from "../../../services/animations.js"

function Wait(props) {


   return (
    <motion.div 
      variants={animations.phaseContainer}
      initial="hide"
      animate="show"
    >
      <h3>
        Waiting for the other players to&nbsp;
        {props.reason}
      </h3>
    </motion.div>
      );
    }

export default Wait;