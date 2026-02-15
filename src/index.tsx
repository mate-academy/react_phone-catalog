import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import React from 'react';
import { AppProvider } from './context/AppContext';
import { ScrollToTop } from './modules/shared/ScrollToTop';

createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProvider>
    <HashRouter>
      <ScrollToTop />
      <App />
    </HashRouter>
  </AppProvider>,
);
