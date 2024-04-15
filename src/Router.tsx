import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { ProductsPage } from './pages/ProductsPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { InfoProductPage } from './pages/InfoProductPage';

const queryClient = new QueryClient();

export const Router = () => (
  <QueryClientProvider client={queryClient}>
    <HashRouter>
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
          <Route path="product">
            <Route path=":productId" element={<InfoProductPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </QueryClientProvider>
);
