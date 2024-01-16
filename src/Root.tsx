import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';
import { PageCommingSoon } from './pages/PageCommingSoon';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';

export const Root: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/tablets" element={<PageCommingSoon />} />
          <Route path="/accessories" element={<PageCommingSoon />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
