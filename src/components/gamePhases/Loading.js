import React from 'react';

function Loading(props) {
// time out, if it eleapses, say the game may have ended 
// or the link ay have been broken, link back to the homepage

   return (
      <div className="loading phase">
         <h3>Loading</h3>
         {props.data.players}
    </div>
      );
    }

export default Loading;