import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import React from 'react';

import './styles/style.scss';
import { FavouritesProvider } from './components/Context/FavouritesContext';
import { CartsProvider } from './components/Context/CartsContext';
import { ScrollToTop } from './components/ScrollToTop';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <FavouritesProvider>
    <CartsProvider>
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    </CartsProvider>
  </FavouritesProvider>,
);
