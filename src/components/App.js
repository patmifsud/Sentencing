import React, { useState, useEffect } from "react"
import Game from './Game';
import LandingPage from './LandingPage';
import { db, auth } from "../services/firebase.js"

// takes care of routing and auth

function App() {
  const urlParam = window.location.pathname.split("/").pop();

  return (
    <div className="App">
      {urlParam}
      <Game />
      <LandingPage />
    </div>
  );
}

export default App;
