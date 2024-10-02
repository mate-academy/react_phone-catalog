import React from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { AppProvider } from './context/AppContext';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <Root />
      </Router>
    </AppProvider>
  </React.StrictMode>,
);
