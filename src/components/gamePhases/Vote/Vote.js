import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Text, useToast } from "@chakra-ui/react";

import animations from "../../../services/animations.js";

import gmService from "../../../services/gameService.js";

import Story from "../../ui/story/Story";
import Wait from "../../ui/subscreens/Wait";
import Sentence from "./Sentence.js";

import "../phases.css";

function Vote({ data }) {
  const [submitting, setSubmitting] = useState(false);
  const [stage, setStage] = useState("intro");

  const [showConfScreen, setShowConfScreen] = useState(false);
  const toast = useToast();

  let setenceAnimationDelay = data.sentenceCache.length * 0.25;

  async function onVote(sentenceIndex){
    setSubmitting(true);
    console.log("voted for ", data.sentenceCache[sentenceIndex]);
    try { 
      gmService.voteForSentence(data, sentenceIndex)
      .then(() => {
        gmService.dbSetPlayerReady(data, true);
        setShowConfScreen(true);
      })
    }
    catch(err) {
      console.log(err);
      setSubmitting(false);
      toast({
        title: 'There was a problem submitting your vote',
        description: "Please try again! Please check your network. If the problem persists, please shoot us an email!",
        status: 'error',
        duration: 7000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    if (data.player && data.player.ready) {
      setShowConfScreen(true);
    } else {
      setShowConfScreen(false);
    }
  }, [data]);

  const voteUI = 
    <>
      <motion.div variants={animations.childAnimations}>
        <Box bg="gray.700" w="100%" mb={5} px={4} py={2} fontSize="xl">
          It's time to decide which sentence makes it into the story
        </Box>
      </motion.div>

      <motion.div variants={animations.childAnimations}>
        <Box bg="gray.700" w="100%" mb={5} px={4} py={2} fontSize="xl">
          <text>Here's the story so far:</text>
          <Story data={data}/>
        </Box>
      </motion.div>

      <motion.div variants={animations.childAnimations}>
        <Text>And the submittions are:</Text>
        { data.sentenceCache &&
          data.sentenceCache.map((sentence, index) => (
            <motion.div
              key={index}
              className="vote-sentence"
              initial={{ opacity: 0, y: -10, transition: { delay: 0.5 } }}
              animate={{ opacity: 1, y: 0, transition: { delay: ( 3 + (0.5 * index)) } }}
            >
              <Sentence 
                data={sentence} 
                i={index} 
                onVote={onVote} 
                submitting={submitting}
                ownSentence={
                  data.player && 
                  (data.player.playerNo === sentence.playerNo) &&
                  data.players.length > 1

                }
              />
            </motion.div>
          ))
        }
      </motion.div>
    </>
    

  return (
    <motion.div
      className="vote phase-container"
      variants={animations.phaseContainer}
      initial="hide"
      animate="show"
    >
      { showConfScreen ?
        <Wait reason="vote" /> : voteUI
      }
    </motion.div>
  );
}

export default Vote;
