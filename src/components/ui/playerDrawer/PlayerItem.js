import React from "react";
import { styled } from "@mui/material/styles";

// MUI
import Avatar from "@mui/material/Avatar";
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";

// Player - current schema
// Id 
// isHost
// turingTest (bot or human)
// name
// playerId (0-6 etc)
// ready
// color
// role (e.g. "writer")
// score

function PlayerItem(props) {

  const initals = (
    props.player.name.match(/(^\S\S?|\b\S)?/g).join("")
    .match(/(^\S|\S$)?/g).join("").toUpperCase()
  );

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: 'green',
  }));

  return (
    <>
      <Divider variant="inset" component="li" />

      <ListItem button key={props.player.id}>
        <Stack direction="row" spacing={3}>
          <ListItemAvatar>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <SmallAvatar  />
              }
            >
              <Avatar>{initals}</Avatar>
          </Badge>
        </ListItemAvatar> 

          {/* to do - figure out how to get a dynamic color */}
        </Stack>
        <ListItemText primary={props.player.name} secondary={props.player.role} />
      </ListItem>
    </>
  );
}
export default PlayerItem;
