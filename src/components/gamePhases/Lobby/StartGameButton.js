import {
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  ButtonGroup,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
} from "@chakra-ui/react";
import {CheckIcon} from "@chakra-ui/icons";

function StartGameButton(props) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button size="lg" colorScheme={props.color}>
          Start game
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Ready to start?</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            {props.namelessPlayers ? (
                'Not everyone has a name yet, are you sure you want to start?'
              ) : (
                'This will close the lobby and start the game, are all players in?'
            )}
            <ButtonGroup mt="5" mb='2' size="sm" d='flex' justifyContent='flex-end'>
              <Button variant="outline">Hold up</Button>
              <Button 
                colorScheme={props.color} 
                onClick={props.onSubmit}
                leftIcon={<CheckIcon />}
              >Yes, let's start</Button>
            </ButtonGroup>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default StartGameButton;


