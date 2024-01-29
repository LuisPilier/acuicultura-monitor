import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/tailwind.css'; 
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

ReactDOM.render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>,
  document.getElementById('root')
);
