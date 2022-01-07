import {
  Button,
  Input,
  HStack,
  Box, 
  Text
} from "@chakra-ui/react";
import {default as ps} from "../../../services/playerService";

import { useState, useEffect } from "react";

function BotToggler({data}) {
  const [botNo, setBotNo] = useState(0);
  const [disableControlls, setDisableControlls] = useState(false);

  const maxBotsPerGame = 4

  useEffect(() => {
    console.log('botnumber changed');
    const botCount = ps.howManyPlayersAreBots(data);
    if (botCount !== botNo) addOrRemoveBots(botCount);
  }, [botNo])

  async function addOrRemoveBots(botCount) {
    console.log('starting addOrRemoveBots')
    setDisableControlls(true);
    ps.addOrRemoveBots(data, botCount, botNo)
    .then(() => {
      console.log('then is running')
      setDisableControlls(false);
    })
  }
  
  return (
    <>
      <Text mb="5">Number of bots in game:</Text>
      <HStack mb="10">
        <Input isReadOnly={true} value={`🤖  ${botNo}`} />
        <Button 
          onClick={() => {setBotNo(botNo + 1)}}
          isDisabled={botNo >= maxBotsPerGame || disableControlls}
        >+</Button>
      </HStack>
    </>
  )
}

export default BotToggler;




