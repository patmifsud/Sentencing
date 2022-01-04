import React from "react";
import { motion } from "framer-motion";
import animations from "../../../services/animations";  
import { IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import './playerDrawer.css';


// Components
import PlayerList from "./PlayerList.js";

// shows all the players in the game
//persistant in all game modes on left hand side of screen
function PlayerDrawer(props) {
  const [pannelOpen, setPannelOpen] = React.useState(true);

  const toggleDrawerOpen = () => {
    setPannelOpen(!pannelOpen);
  };

  const playerDrawer = {
    hidden: { 
      minWidth: "clamp(70px, 15vw, 130px)",
      transition: animations.springTransition
    },
    shown: {
      minWidth: "clamp(300px, 30vw, 400px)",
      transition: animations.springTransition
    }
  }

  return (
    <motion.div className="player-drawer"
      variants={playerDrawer}
      animate={pannelOpen ? "shown" : "hidden"}
    >
      
      <div className="player-drawer-header" >
        <IconButton
          variant='outline'
          aria-label='Toggle drawer'
          size='sm'
          onClick={toggleDrawerOpen} 
          icon=
            {pannelOpen ? 
              <ChevronLeftIcon /> : 
              <ChevronRightIcon />
            }
        />
      </div>

      <PlayerList data={props.data} pannelOpen={pannelOpen}/>

    </motion.div>
  );
}

export default PlayerDrawer;
