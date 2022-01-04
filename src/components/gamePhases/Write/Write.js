import React, { useState, useEffect} from 'react';
import gmService from '../../../services/gameService';

import Timer from '../../ui/story/Timer'
import Info from '../../ui/story/Info'
import Story from '../../ui/story/Story'
import StoryForm from '../../ui/story/StoryForm'
import Wait from '../../ui/subscreens/Wait'
import { useToast } from '@chakra-ui/react'

import { motion } from 'framer-motion'
import animations from "../../../services/animations.js"

import '../phases.css';

function Write(props) {
  const [submitting, setSubmitting] = useState(false);
  const [input, setInput] = useState('');
  const [showConfScreen, setShowConfScreen] = useState(false);
  const toast = useToast();

  function showToast(type){
    switch(type){
      case 'success':
        toast({
          title: 'Sentence submitted',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        break;
      default:
        toast({
          title: 'There was a problem submitting your sentence',
          description: "Please check your network. If the problem persists, shoot us an email!",
          status: 'error',
          duration: 7000,
          isClosable: true,
        })
      }
  }

  async function submitStory(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      gmService.addToSentenceCache(props.data, input)
      .then(() => {
        setShowConfScreen(true);
        showToast('success');
        gmService.dbSetPlayerReady(props.data, true);
      })
    }
    catch(err) {
      console.log(err);
      setSubmitting(false);
      showToast('error');
    }
  }

  const writeUI = (
    <div className="write-container">
      <Timer data={props.data}/>
      <Info text="It's your turn to add to the story"/>
      <Story data={props.data}/>
      <StoryForm 
        player={props.data.player} 
        onSubmit={submitStory}
        submitting={submitting}
        setInput={setInput}
      />
    </div>
  )

  return (
    <motion.div
      className="write phase-container"
      initial="hide" 
      animate="show"
      variants={animations.phaseContainer}
    >
      { !showConfScreen ?
          // if the player is the writer and the sentence is not submitted
          writeUI 
          :
          // if the player is an editor OR a writer and sentence has been submitted already
          <Wait reason="add their story ideas" />
      }
    </motion.div>
    );
  }

export default Write;

