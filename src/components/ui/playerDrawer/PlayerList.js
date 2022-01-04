import React from "react";
import { motion, LayoutGroup } from "framer-motion";
import './playerDrawer.css';


// Components
import PlayerItem from "./PlayerItem.js";

// shows all the players in the game
//persistant in all game modes on left hand side of screen
function PlayerList(props) {

  const scaleAnimation = {
    small: { scale: 0.9 },
    large: { scale: 1 }
  }

  const slideIn = {
    initial: {               
      opacity: 0,
      x: -200, 
      height:0,
    },
    animate: { 
      opacity: 1, 
      x: 0, 
      height: 'auto', 

    },
  }

  const spring = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  };
  

  return (
      <motion.div 
        variants={scaleAnimation}
        initial="small"
        animate={props.pannelOpen ? "large" : "small"}
      >
        <LayoutGroup>

          { props.data.players && 
            props.data.players.sort((a, b) => {
              return b.score - a.score;
            }).map((player, index) => (
              <motion.div
                key={player.playerNo}
                layout
                transition={spring}
                initial={{opacity: 0, y: -4, transition: { delay: 0.01 * index , duration: 0.5 } }}              
                animate={{opacity: 1, y: -4, transition: { delay: 0.01 * index , duration: 0.5} }}
                // transition={slideIn.transition}
                delay={index * 0.1}
                // exit={{ opacity: 0, height: 0 }}
                >
                <PlayerItem 
                  player={player} 
                  pannelOpen={props.pannelOpen}
                />

              </motion.div>

          ))}
        </LayoutGroup>

      </motion.div>
  );
}

export default PlayerList;
