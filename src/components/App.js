import React, { useState, useEffect } from "react"
import Game from './Game';
import LandingPage from './LandingPage';
import { db, auth } from "../services/firebase.js"

// takes care of routing and auth
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#FFAE1B',
    },
    secondary: {
      main: '#6297ff',
      dark: '#1868fb',
    },
    background: {
      default: '#18181b',
      paper: '#333333',
    },
    text: {
      primary: 'rgba(255,255,255,0.87)',
      secondary: 'rgba(220,220,220,0.54)',
      disabled: 'rgba(142,142,142,0.38)',
      hint: 'rgba(175,175,175,0.38)',
    },
  },
  typography: {
    fontWeightLight: 500,
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
  },
  overrides: {
    MuiToolBar: {
      colorInherit: {
        backgroundColor: '#689f38',
        color: '#fff',
      },
    },
  },
  props: {
    MuiAppBar: {
      color: 'inherit',
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});


function App() {
  const urlParams = window.location.pathname.split("/").pop();

  return (

    <div className="App">
      <ThemeProvider theme={theme}>
        { urlParams ?
          <Game urlParams={urlParams}/>  :
          <LandingPage />
        }
      </ThemeProvider>
    </div>
  );
}

export default App;
