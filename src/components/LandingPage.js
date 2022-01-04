import React, { useState, useEffect } from "react";
import { createNewGame } from "../services/initService.js"
import logoLockuo from '../assets/logo-lockup.svg'
import { FormLabel, Button, Text, PinInput, PinInputField, HStack } from "@chakra-ui/react";

import { motion } from "framer-motion"


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

  useEffect(() => {
    setStartingGame(false);
  }, []);

  return (
    <main className="landingPage">
      <section className="left">
        <div>
          <img className="logo" title="Sentencing" src={logoLockuo} />
          <Text fontSize='xs' mt='4' mb='5' fontWeight='500' opacity='0.4'>[ 1-8 players | ~10minutes ]</Text>
        </div>
        
        <div>
          <Button 
            bg='#FFAE1B'
            colorScheme='orange'
            isLoading={startingGame}
            my="4" 
            onClick={_startButtonHandler}
          >
            Start a game
          </Button>
          
          <Text fontSize='xs' my='3' fontWeight='500' opacity='0.4'> or</Text>

          <form 
            onSubmit={_joinButtonHandler}
            onChange={(e) => setGameCode(e.target.value)}
          >
            <HStack >
              <PinInput type='alphanumeric'>
                <PinInputField placeholder="A"/>
                <PinInputField placeholder="B"/>
                <PinInputField placeholder="1"/>
                <PinInputField placeholder="2"/>
                <PinInputField placeholder="E"/>
              </PinInput>
            </HStack>
            <Button 
              variant='outline' 
              my="4" 
              type="submit"
            >
              Join a game
            </Button>
          </form>
        </div>
      </section>
      <section className="right">
          {/* <Snackbar
            severity="error"
            open={gameCodeError}
            autoHideDuration={6000}
            onClose={handleClose}
            message="There was an error creating your game, please try again later"
          /> */}
          <Text className="credit" fontSize='xs' fontWeight='500' opacity='0.7'> Gif by <a href="https://majasbokshop.com">MAJASBOK</a></Text>
        </section>
    </main>
  );
}

export default LandingPage;
