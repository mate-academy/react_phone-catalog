import { useState, useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './modules/shared/components/AppLayout';
import { HomePage } from './modules/Home/HomePage';
import { CatalogPage } from './modules/Catalog';
import { ProductDetailsPage } from './modules/ProductDetails';
import { CartPage } from './modules/Cart';
import { FavoritesPage } from './modules/Favorites';
import { NotFoundPage } from './modules/NotFound';
import {
  getCategories,
  getProducts,
} from './modules/shared/services/productService';
import { Category } from './types/Category';
import { Product } from './types/Product';

export const App = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
    getProducts()
      .then(setProducts)
      .catch(() => {});
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<AppLayout categories={categories} products={products} />}
        >
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          {categories.map(category => (
            <Route
              key={category.id}
              path={category.path.replace('/', '')}
              element={<CatalogPage />}
            />
          ))}

          <Route path="product/:productId" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
