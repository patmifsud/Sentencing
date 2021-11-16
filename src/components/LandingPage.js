import React, { useState, useEffect } from "react";
import { createNewGame } from "../services/initService.js"
import { motion } from "framer-motion"

import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";


// takes care of routing and auth stuff
function LandingPage() {
  const [gameCode, setGameCode] = useState("");
  const [gameCodeError, setGameCodeError] = useState(false);
  const [startingGame, setStartingGame] = useState(false);

  function _joinButtonHandler(e) {
    e.preventDefault();
    window.location.href = `/${gameCode}`;
  }

  function generateGameCode() {
    return Math.random().toString(36).substr(2, 5);
  }

  function _startButtonHandler() {
    setStartingGame(true);
    // check if the user is logged in, if not signInWithGoogle()
    // if they are logged in,
    let newGameCode = generateGameCode();
    setGameCode(newGameCode);

    createNewGame(
      newGameCode, 
      setStartingGame,
      setGameCodeError
    );
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setGameCodeError(false);
  };

  useEffect(() => {
    setStartingGame(false);
  }, []);

  return (
    <main className="landingPage">
      <section className="start">
        <div>
          <h1>Sentencing</h1>
          <h4>Make terrible stories with your friends, and robots</h4>
          <p>(1-8 players, ~10minutes)</p>
        </div>
        <div>
          <LoadingButton
            onClick={_startButtonHandler}
            loading={startingGame}
            loadingPosition="center"
            variant="contained"
          >
            Start a game
          </LoadingButton>

          <p>or</p>
          <form onSubmit={_joinButtonHandler}>
            <TextField
              id="filled"
              label="Game Code:"
              variant="filled"
              onChange={(e) => setGameCode(e.target.value)}
            />
            <Button type="submit" variant="contained" value="12345">
              Join a game
            </Button>
          </form>
        </div>
      </section>
      <section className="right"></section>

      <Snackbar
        severity="error"
        open={gameCodeError}
        autoHideDuration={6000}
        onClose={handleClose}
        message="There was an error creating your game, please try again later"
      />
    </main>
  );
}

export default LandingPage;
