import React from 'react';
import { createRoot } from 'react-dom/client';  // Import createRoot
import App from './App';
import './index.css';

// Get the root element from the DOM
const container = document.getElementById('root');
const root = createRoot(container);  // Create a root.

// Render the App component to the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
