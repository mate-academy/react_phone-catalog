import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';

export const Router = () => {
  return (
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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
