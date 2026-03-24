import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { useAppInit } from './hooks/useAppInit';
import { CATEGORIES } from './modules/shared/constants/categories';

import { AppLayout } from './modules/shared/components/AppLayout';
import { HomePage } from './modules/Home/HomePage';
import { CatalogPage } from './modules/Catalog';
import { ProductDetailsPage } from './modules/ProductDetails';
import { CartPage } from './modules/Cart';
import { FavoritesPage } from './modules/Favorites';
import { NotFoundPage } from './modules/NotFound';
import { Loader } from './modules/shared/components/Loader';

export const App = () => {
  const { products, categoriesWithCounts, isLoading, hasError } = useAppInit();

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
        <h1 className="error-title">Something went wrong</h1>
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
          element={
            <AppLayout categories={categoriesWithCounts} products={products} />
          }
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
