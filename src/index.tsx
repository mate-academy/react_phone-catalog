import { createRoot } from 'react-dom/client';
import { App } from './App';
import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProviders } from './context/AppProviders';

createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProviders>
    <Router basename="/react_phone-catalog/">
      <StrictMode>
        <App />
      </StrictMode>
    </Router>
    ,
  </AppProviders>,
);
