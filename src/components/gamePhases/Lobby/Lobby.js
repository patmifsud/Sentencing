import React, { useEffect, useState } from "react";
import playerService from "../../../services/playerService.js";
import gmService from "../../../services/gameService.js";


import { Divider, Box, Text } from '@chakra-ui/react'

import Player from "../../../models/player.js";
import PlayerNameForm from "./PlayerNameForm.js";
import StartGameButton from "./StartGameButton.js";
import "../phases.css";

import { motion } from "framer-motion";
import animations from "../../../services/animations.js";
import BotToggler from "./BotToggler.js";

const ps = playerService;

function Lobby({data}) {
  const [isHost, setHost] = useState(false);
  const [mintingPlayer, setMintingPlayer] = useState(false);

  useEffect(() => {
    if (!ps.isPlayerInState(data)) {
      checkPlayerHasNumber();
    }
    if (ps.isHost(data)) {
      setHost(true);
    }
  }, [data.players, data.playerNo]);


  function checkPlayerHasNumber(){
    if (ps.hasPlayersArrayLoaded(data)) {
      if (ps.isExistingPlayer(data)) {
        const playerNo = ps.getLocalPlayerPosition(data);
        ps.addLocalPlayerToState(
          data, data.players[playerNo]
        );
      }
      else if (ps.isPlayerSpectator(data)) {
        if (!mintingPlayer) {
          setMintingPlayer(true);
          generateNewPlayer();
        }
      } 
    }
  }

  async function generateNewPlayer() {
    console.log('generating new player')
    let randomId = ps.makeRandomId();
    const localId = 
      localStorage.getItem("localId") || randomId;
    const newPlayerNo = data.players.length;
    const player = 
      new Player(null, newPlayerNo, false, false, localId);
    ps.mintNewPlayer(data.gameId,player,newPlayerNo)
    .then(() => {
      localStorage.setItem("localId", localId); 
      data.setPlayerNo(newPlayerNo);
      setMintingPlayer(false);
    })
    .catch((e) => {
      console.log("error minting player: ", e);
      setMintingPlayer(false);
    });
  }

  function checkPlayersHaveNames() {
    let allPlayersHaveNames = true;
    data.players.forEach(player => {
      if (!player.name) allPlayersHaveNames = false
    });
    return allPlayersHaveNames;
  }

  function startGame() {
    if (!checkPlayersHaveNames()) {
      ps.createRemainingPlayerNames(data);
    }
    gmService.dbSetAllPlayersReady(
      data, true
    );
  }


  return (
    <motion.div
      className="lobby phase-container"
      variants={animations.phaseContainer}
      initial="hide"
      animate="show"
    >
      <div>
        { data.player && 
          !data.player.name && (
            <PlayerNameForm data={data} />
          )
        }
        <Divider my="5" />
        <Box bg="gray.700" w="100%" mb={5} px={4} py={2} fontSize="xl">
          <div className="game-code">
            <Text fontSize='xs'>Game code:</Text> 
            {data.gameId} 
          </div>
        </Box>
        <Divider my="5" />


        {isHost && (
          <>
          {/* <Text fontSize='m' mb='5'>Game Settings:</Text>  */}

          {/* commenting out for main branch */}
          {/* <BotToggler data={data}/> */}

          <Divider my="5" />

          <StartGameButton 
            color={data.color} 
            onSubmit={startGame}
            namelessPlayers={!checkPlayersHaveNames()}
          /> 

          </>
        )}
        {!isHost && (
          <p>The host can start the game when ready</p>
        )}

      </div>
    </motion.div>
  );
}

export default Lobby;
