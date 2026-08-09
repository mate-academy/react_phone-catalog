import { createRoot } from 'react-dom/client';
import { App } from './App';
import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProviders } from './context/AppProviders';
import { ScrollToTop } from './components/ScrollToTop';

createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProviders>
    <Router basename="/react_phone-catalog/">
      <StrictMode>
        <ScrollToTop />
        <App />
      </StrictMode>
    </Router>
  </AppProviders>,
);
