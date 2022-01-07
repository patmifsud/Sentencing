import React, { useState } from "react";
import playerService from "../../../services/playerService";
import {motion} from "framer-motion";
import { FormLabel, Button, Input } from "@chakra-ui/react";


function PlayerNameForm(props) {
  const [nameValue, setNameValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpacity(0);
    setLoading(true);
    setTimeout(() => { 
      if (playerService.updateName(
          props.data.playerNo,
          nameValue,
          props.data
        )) {
        console.log("name updated");
      } else {
        setOpacity(1);
        setLoading(false);
      }
    }, 300);
  };

  return (
    <>
      <motion.div animate={{ opacity: opacity }}>
        <form
          onSubmit={handleSubmit}
          onChange={(e) => setNameValue(e.target.value)}
        >
          <FormLabel>Hello, my name is:</FormLabel>
          <Input type="text" placeholder='First name' />
          <Button
            isLoading={loading}
            my="4" 
            type='submit'
          >
            Add Name
          </Button>
        </form>
      </motion.div>
    </>
  );
}

export default PlayerNameForm;
