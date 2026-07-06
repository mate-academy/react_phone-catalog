import { Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductsDetailsPage } from './pages/ProductsDetailsPage';
import { CartPage } from './pages/CartPage';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/:category" element={<ProductsPage />} />
        <Route path="/:category/:itemId" element={<ProductsDetailsPage />} />
      </Route>
    </Routes>
  );
};
