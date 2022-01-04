import React from 'react';
import ReactDOM from 'react-dom';

import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme/theme.js'

import App from './components/App';

import './index.css';
import './game.css';


ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode> 
        <App />
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);
