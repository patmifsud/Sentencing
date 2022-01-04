import React, { useEffect } from 'react';
import { motion } from 'framer-motion'
import animations from "../../services/animations.js"
import './phases.css';


function End(props) {
   return (
    <motion.div 
      className="end phase-container" 
      variants={animations.phaseContainer}
      initial="hide"
      animate="show"
    >
      <h3>End</h3>
    </motion.div>
      );
    }

export default End;