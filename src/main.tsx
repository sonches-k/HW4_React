import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "@fontsource/luckiest-guy"; 

const container = document.getElementById('root');
if (!container) throw new Error("Root container not found");

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
