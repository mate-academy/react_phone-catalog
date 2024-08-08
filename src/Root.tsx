import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import { App } from './App';
import HomePage from './pages/HomePage/HomePage';
import { ProductContext } from './context/ProductContext';
import PhonesPage from './pages/PhonesPage/PhonesPage';
import TabletsPage from './pages/TabletsPage/TabletsPage';
import AccessoriesPage from './pages/AccessoriesPage/AccessoriesPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import FavouritePage from './pages/FavouritePage/FavouritePage';
import CartPage from './pages/CartPage/CartPage';

export const Root: React.FC = () => {
  return (
    <Router>
      <ProductContext>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route path="phones">
              <Route index element={<PhonesPage />} />
              <Route path=":productId?" element={<DetailsPage />} />
            </Route>

            <Route path="tablets">
              <Route index element={<TabletsPage />} />
              <Route path=":productId?" element={<DetailsPage />} />
            </Route>

            <Route path="accessories">
              <Route index element={<AccessoriesPage />} />
              <Route path=":productId?" element={<DetailsPage />} />
            </Route>

            <Route path="favourites" element={<FavouritePage />} />
            <Route path="cart" element={<CartPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ProductContext>
    </Router>
  );
};
