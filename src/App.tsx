import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { Product } from './types/Product';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

export const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then(setProducts);
  }, []);

  const phones = products.filter(product => product.type === 'phone');
  const tablets = products.filter(product => product.type === 'tablet');
  const accessories = products.filter(product => product.type === 'accessory');

  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route
            index
            element={<HomePage products={products} />}
          />
          <Route
            path=":productId"
            element={<ProductDetailsPage products={products} />}
          />
        </Route>

        <Route path="phones">
          <Route
            index
            element={<PhonesPage phones={phones} />}
          />
          <Route
            path=":productId"
            element={<ProductDetailsPage products={phones} />}
          />
        </Route>

        <Route path="tablets">
          <Route
            index
            element={<TabletsPage tablets={tablets} />}
          />
          <Route
            path=":productId"
            element={<ProductDetailsPage products={tablets} />}
          />
        </Route>

        <Route path="accessories">
          <Route
            index
            element={<AccessoriesPage accessories={accessories} />}
          />
          <Route
            path=":productId"
            element={<ProductDetailsPage products={accessories} />}
          />
        </Route>

        <Route
          path="favourites"
          element={<FavouritesPage />}
        />

        <Route
          path="shoppingBag"
          element={<CartPage />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
