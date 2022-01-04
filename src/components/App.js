import React, { useState, useEffect } from "react"
import Game from './Game';
import LandingPage from './LandingPage';

// takes care of routing and auth


function App() {
  const url = window.location.pathname.split("/").pop()

  return (
    <div className="App">
        { url ?
          <Game urlParams={url}/>  :
          <LandingPage />
        }
    </div>
  );
}

export default App;
