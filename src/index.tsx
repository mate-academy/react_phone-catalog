import React from 'react';
import { createRoot } from 'react-dom/client';
// import { HashRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { AppProvider } from './AppContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProvider>
    <Router>
      <App />
    </Router>
  </AppProvider>,
);
