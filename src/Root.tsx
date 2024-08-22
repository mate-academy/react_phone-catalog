import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/ProductsPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones" element={<ProductsPage />} />
        <Route path="tablets" element={<ProductsPage />} />
        <Route path="accessories" element={<ProductsPage />} />
        <Route path="phones/:productId" element={<ProductDetailsPage />} />
        <Route path="tablets/:productId" element={<ProductDetailsPage />} />
        <Route path="accessories/:productId" element={<ProductDetailsPage />} />
      </Route>
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  </HashRouter>
);
