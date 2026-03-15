import { useState, useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CATEGORIES } from './modules/shared/constants/categories';
import { getProducts } from './modules/shared/services/productService';

import { AppLayout } from './modules/shared/components/AppLayout';
import { HomePage } from './modules/Home/HomePage';
import { CatalogPage } from './modules/Catalog';
import { ProductDetailsPage } from './modules/ProductDetails';
import { CartPage } from './modules/Cart';
import { FavoritesPage } from './modules/Favorites';
import { NotFoundPage } from './modules/NotFound';
import { Loader } from './modules/shared/components/Loader';

import { Product } from './types/Product';

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getProducts()
      .then(fetchedProducts => {
        setProducts(fetchedProducts);
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="app-initial-state">
        <Loader />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="app-initial-state">
        <h1 className="error-message">Something went wrong</h1>
        <button
          type="button"
          className="reload-button"
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<AppLayout categories={CATEGORIES} products={products} />}
        >
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          {CATEGORIES.map(category => (
            <Route
              key={category.id}
              path={category.path}
              element={<CatalogPage />}
            />
          ))}

          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="product/:productId" element={<ProductDetailsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
