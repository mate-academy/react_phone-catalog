/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Product } from './types/Product';
import { ProductDetails } from './types/ProductDetails';
import * as api from './api/api';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './components/pages/HomePage/HomePage';
import { PhonesPage } from './components/pages/PhonesPage/PhonesPage';
import { ProductDetailsPage } from './components/pages/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './components/pages/CartPage/CartPage';
import { FavoritesPage } from './components/pages/FavoritesPage/FavoritesPage';

import './App.scss';

export const App: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [details, setDetails] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getProducts(), api.getProductsDetails()])
      .then(([productsData, detailsData]) => {
        setAllProducts(productsData);
        setPhones(productsData.filter(item => item.category === 'phones'));
        setTablets(productsData.filter(item => item.category === 'tablets'));
        setAccessories(
          productsData.filter(item => item.category === 'accessories'),
        );
        setDetails(detailsData);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <Routes>
          <Route path="/" element={<HomePage products={phones} />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route
            path="/phones"
            element={<PhonesPage products={phones} title="Mobile phones" />}
          />

          <Route
            path="/tablets"
            element={<PhonesPage products={tablets} title="Tablets" />}
          />

          <Route
            path="/accessories"
            element={<PhonesPage products={accessories} title="Accessories" />}
          />

          <Route
            path="/:category/:productId"
            element={
              <ProductDetailsPage products={allProducts} details={details} />
            }
          />

          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
