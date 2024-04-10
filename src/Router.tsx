import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export const Router = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/phones" element={<ProductPage type="phones" />} />
            <Route path="/tablets" element={<ProductPage type="tablets" />} />
            <Route
              path="/accessories"
              element={<ProductPage type="accessories" />}
            />
            <Route path="/favourites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/product/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
};
