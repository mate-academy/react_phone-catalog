import React from 'react';
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

export const Root: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" />} />

        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
      </Route>
    </Routes>
  </HashRouter>
);
