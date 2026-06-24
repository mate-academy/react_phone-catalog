import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import React from 'react';
import { ShopProvider } from './components/ShopContext';
import { ThemeProvider } from './utils/themeContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ThemeProvider>
      <ShopProvider>
        <App />
      </ShopProvider>
    </ThemeProvider>
  </Router>,
);
