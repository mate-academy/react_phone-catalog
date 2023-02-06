import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AccesoriesPage } from '../pages/AccesoriesPage';
import { CartPage } from '../pages/CartPage';
import { FavoritePage } from '../pages/FavoritePage';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PhonesPage } from '../pages/PhonesPage';
import { ProductPage } from '../pages/ProductPage';
import { TabletsPage } from '../pages/TabletsPage';

export const Main: React.FC = () => {
  const checkoutText = 'We are sorry, but this feature is not implemented yet';
  const notFoundPageText = "Sorry, but this page doesn't exist";

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route
          path="/accessories"
          element={<AccesoriesPage />}
        />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route
          path="/checkout"
          element={<NotFoundPage text={checkoutText} />}
        />
        <Route path="*" element={<NotFoundPage text={notFoundPageText} />} />
      </Routes>
    </main>
  );
};
