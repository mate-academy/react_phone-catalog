import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { InfoProductPage } from './pages/InfoProductPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { BasketPage } from './pages/BasketPage';

const queryClient = new QueryClient();

export const Router = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones" element={<ProductsPage type="phones" />} />
          <Route path="tablets" element={<ProductsPage type="tablets" />} />
          <Route
            path="accessories"
            element={<ProductsPage type="accessories" />}
          />
          {['/phones', '/tablets', '/accessories'].map((path, index) => (
            <Route path={path} key={index}>
              <Route path=":productId" element={<InfoProductPage />} />
            </Route>
          ))}
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="basket" element={<BasketPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
