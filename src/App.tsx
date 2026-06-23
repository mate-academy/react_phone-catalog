import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { CatalogPage } from './components/CatalogPage';
import { getAccessories, getPhones, getTablets } from './api';
import { HomePage } from './components/HomePage/HomePage';
import { FavoritesPage } from './components/FavoritesPage/FavoritesPage';
import { CartPage } from './components/CartPage/CartPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './components/ProductDeatils/ProductDetailsPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Footer } from './components/Footer/Footer';

export const App = () => (
  <div className="App">
    <Header />

    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route
          path="/phones"
          element={
            <CatalogPage
              breadcrumbLabel="Phones"
              emptyMessage="There are no phones yet"
              fetchProducts={getPhones}
              title="Mobile phones"
            />
          }
        />
        <Route
          path="/tablets"
          element={
            <CatalogPage
              breadcrumbLabel="Tablets"
              emptyMessage="There are no tablets yet"
              fetchProducts={getTablets}
              title="Tablets"
            />
          }
        />
        <Route
          path="/accessories"
          element={
            <CatalogPage
              breadcrumbLabel="Accessories"
              emptyMessage="There are no accessories yet"
              fetchProducts={getAccessories}
              title="Accessories"
            />
          }
        />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>

    <Footer />
  </div>
);
