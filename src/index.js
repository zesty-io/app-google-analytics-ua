import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './theme'
import { ThemeProvider } from '@mui/material/styles'
import {CssBaseline} from '@mui/material'
import ContextWrapper from "./context";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
