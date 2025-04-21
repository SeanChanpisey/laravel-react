import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  // Remove the curly braces

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);