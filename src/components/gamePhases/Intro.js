import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Divider, Heading } from "@chakra-ui/react";

import playerService from "../../services/playerService";
import gmService from "../../services/gameService.js";
import animations from "../../services/animations.js";
import "./phases.css";

function Intro(props) {
  const [titleAnimate, setTitleAnimate] = useState("show");

  useEffect(() => {
    setTimeout(() => {
      setTitleAnimate("hide");
      setTimeout(() => {
        gmService.dbSetPlayerReady(props.data, true);
      }, 1000);
    }, 4000);
  }, []);

  return (
    <div className="intro phase-container">
      <motion.div
        animate={titleAnimate}
        initial="hide"
        variants={animations.phaseTitle}
      >
        <Heading className="phase-title" size="xl">
          Meet today's esteemed authours:
        </Heading>
      </motion.div>
      <p>Player list will go here</p>

    </div>
  );
}

export default Intro;
