import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './modules/Core/AppLayout';
import { HomePage } from './modules/HomePage';
import { CatalogPage } from './modules/CatalogPage';
import { Product } from './types/Product';
import { getProducts } from './api/products';
import { FavouritesPage } from './modules/FavouritesPage';

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(error => {
        throw new Error('Error loading products:', error);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
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

        <Route path="cart" element={<div>Cart Page</div>} />

        <Route
          path="favourites"
          element={<FavouritesPage favourites={products} />}
        />

        <Route path="*" element={<div>Page not Found</div>} />
      </Route>
    </Routes>
  );
};
