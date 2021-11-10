import React from 'react';
import ComponentLibrary from "./ui/ComponentLibrary";
// takes care of routing and auth


function LandingPage() {
  function generateGameCode() {
    return Math.random().toString(36).substr(2, 5);
  }

  return (
    <main class="landingPage">
      <section class="start">
        You are viewing the <strong>Landing Page</strong>
        <a href="/12345">Go to Game</a>
      </section>
      <section class="right">
        
      </section>


      {process.env.NODE_ENV === 'development' ? 
         <ComponentLibrary /> 
         : ' '
      }
    </main>
  );
}

export default LandingPage;
