import React from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage/HomePage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer/Footer';
import { CartPage } from './modules/CartPage/CartPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { ProductPage } from './modules/ProductPage/ProductPage';
import { CategoryName } from './modules/shared/enums/categoryName';
import { ProductDetailsPage } from './modules/ProductDetailsPage';

export const App = () => (
  <div className="App">
    <header className="header">
      <Header />
    </header>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/phones">
        <Route index element={<ProductPage category={CategoryName.PHONES} />} />

        <Route path=":productId" element={<ProductDetailsPage />} />
      </Route>
      <Route path="/tablets">
        <Route
          index
          element={<ProductPage category={CategoryName.TABLETS} />}
        />

        <Route path=":productId" element={<ProductDetailsPage />} />
      </Route>
      <Route path="/accessories">
        <Route
          index
          element={<ProductPage category={CategoryName.ACCESSORIES} />}
        />

        <Route path=":productId" element={<ProductDetailsPage />} />
      </Route>
    </Routes>
    <footer className="footer">
      <Footer />
    </footer>
  </div>
);
