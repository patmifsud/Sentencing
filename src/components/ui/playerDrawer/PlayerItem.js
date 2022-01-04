import { React, useState } from "react";
import './playerDrawer.css';

//------------------------------------------------------
// Player - current schema
// Id
// isHost
// name
// playerNo (0-6 etc)
// ready
// color
// role (e.g. "writer")
// score

function PlayerItem( { player, pannelOpen } ) {
  // const [popupOpen, setPopupOpen] = useState(false);

  const initals = player.name
    ? player.name
        .match(/(^\S\S?|\b\S)?/g)
        .join("")
        .match(/(^\S|\S$)?/g)
        .join("")
        .toUpperCase()
    : "??";

  return (
    <>
      <div 
        className="player-item"         
        // onClick={() => setPopupOpen(!popupOpen)}
      >
        <div className="player-avatar">
          <div className="initials">{initals}</div>
        </div>

        {pannelOpen && (
          <div className="player-details">
            <p className="player-name">{player.name}</p>
            <p className="player-score">{player.score}</p>
          </div>
        )}
      </div>
    </>
  );
}
export default PlayerItem;
