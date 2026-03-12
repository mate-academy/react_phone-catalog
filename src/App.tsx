import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AppLayout } from './modules/Core/AppLayout';
import { HomePage } from './modules/HomePage';
import { CatalogPage } from './modules/CatalogPage';
import { Product } from './types/Product';
import { getProducts } from './api/products';
import { FavouritesPage } from './modules/FavouritesPage';
import { CartPage } from './modules/CartPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { NotFoundPage } from './modules/NotFoundPage';

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(error => {
        throw new Error('Error loading products:', error);
      });
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      return;
    }
  }, [isInitialLoad]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout isLoading={isInitialLoad} />}>
        <Route index element={<HomePage />} />
        <Route
          path="phones"
          element={<CatalogPage categoryType="phones" products={products} />}
        />

        <Route
          path="tablets"
          element={<CatalogPage categoryType="tablets" products={products} />}
        />

        <Route
          path="accessories"
          element={
            <CatalogPage categoryType="accessories" products={products} />
          }
        />

        <Route path="cart" element={<CartPage />} />

        <Route path="favourites" element={<FavouritesPage />} />

        <Route path=":category/:itemId" element={<ProductDetailsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
