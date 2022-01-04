import React, { useEffect, useState } from "react";
import playerService from "../../../services/playerService.js";
import gmService from "../../../services/gameService.js";

import Player from "../../../models/player.js";
import PlayerNameForm from "./PlayerNameForm.js";
import StartGameButton from "./StartGameButton.js";
import "../phases.css";

import { motion } from "framer-motion";
import animations from "../../../services/animations.js";

const ps = playerService;

function Lobby(props) {
  const [isHost, setHost] = useState(false);
  const [mintingPlayer, setMintingPlayer] = useState(false);
  // to do - add a way to set minting player to false if we fail to mint player
  
  function checkPlayerHasNumber(){
    if (ps.hasPlayersArrayLoaded(props.data)) {
      if (ps.isExistingPlayer(props.data)) {
        const playerNo = ps.getLocalPlayerPosition(props.data);
        ps.addLocalPlayerToState(
          props.data, playerNo
        );
      }
      else if (ps.isPlayerSpectator(props.data)) {
        if (!mintingPlayer) generateNewPlayer();
      } 
    }
  }

  function generateNewPlayer() {
    setMintingPlayer(true);
    let randomId = ps.makeRandomId();
    const localId = 
      localStorage.getItem("localId") || randomId;
    const newPlayerNo = props.data.players.length;
    const onSuccess = () => {
      props.data.setPlayerNo(newPlayerNo);
      setMintingPlayer(false);
    };
    const player = 
      new Player(null, newPlayerNo, false, false, localId);
    ps.mintNewPlayer(
      props.data.gameId,
      player,
      onSuccess,
      newPlayerNo
    );
  }

  function checkPlayersHaveNames() {
    let allPlayersHaveNames = true;
    props.data.players.forEach(player => {
      if (!player.name) allPlayersHaveNames = false
    });
    return allPlayersHaveNames;
  }

  function startGame() {
    if (!checkPlayersHaveNames()) {
      ps.createRemainingPlayerNames(props.data);
    }
    gmService.dbSetAllPlayersReady(
      props.data, true
    );
  }

  useEffect(() => {
    if (!ps.isPlayerInState(props.data)) {
      checkPlayerHasNumber();
    }
    if (ps.isHost(props.data)) {
      setHost(true);
    }
  }, [props.data.players, props.data.playerNo]);

  return (
    <motion.div
      className="lobby phase-container"
      variants={animations.phaseContainer}
      initial="hide"
      animate="show"
    >
      <div>
        { props.data.player && 
          !props.data.player.name && (
            <PlayerNameForm data={props.data} />
          )
        }
        
        <div class="game-code"> {props.data.gameId} </div>
        {isHost && (
          <StartGameButton 
            color={props.data.color} 
            onSubmit={startGame}
            namelessPlayers={!checkPlayersHaveNames()}
          /> 
        )}
        {!isHost && (
          <p>The host can start the game when ready</p>
        )}

      </div>
    </motion.div>
  );
}

export default Lobby;
