import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Certifique-se de que a renderização está sendo feita na div com id="app"
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
