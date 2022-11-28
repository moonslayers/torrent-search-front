import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
require('dotenv').config();
console.log(process.env.REACT_APP_API)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

