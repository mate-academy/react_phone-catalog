import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';
import { HashRouter as Router } from 'react-router-dom';
import { AppContext } from './appContext/AppContext';
import PiwikPro from '@piwikpro/react-piwik-pro';

PiwikPro.initialize('f4be222a-cf5f-4dcb-bf11-34b62c9f571a', 'https://patryk.piwik.pro');

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <AppContext>
        <App />
      </AppContext>
    </Router>
  </React.StrictMode>,
);
