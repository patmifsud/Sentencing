import React from "react"

import {Button} from "@chakra-ui/react";
import {CheckCircleIcon} from '@chakra-ui/icons';

function Sentence({data, i, onVote, submitting, ownSentence}) {

  const voteButton =  
    <Button 
      leftIcon={<CheckCircleIcon />} 
      variant='solid' 
      onClick={() => {onVote(i)}} >
        Choose
    </Button>

  return (
    <div className={`vote-Sentence ${submitting && 'disable'}`}>
      <div className="player-avatar">
        <div className="initials">?</div>
      </div>
      <div className="bubble">
        " {(data && data.text) && data.text} "
       { ownSentence ? <b>  (yours)</b> : voteButton}
      </div>
    </div>
  );
}

export default Sentence;