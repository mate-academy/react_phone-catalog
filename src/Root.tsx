import { Routes, Route, Navigate } from 'react-router-dom';
import { App } from './modules/components/App';
import { HomePage } from './modules/components/HomePage';
import { ProductsPage } from './modules/components/ProductsPage';
import { ProductDetailsPage } from './modules/components/ProductDetailsPage';
import { Favourites } from './modules/components/Favourites';
import { CartPage } from './modules/components/CartPage';
import { NotFoundPage } from './modules/components/NotFoundPage';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path=":category" element={<ProductsPage />} />
        <Route path=":category/:productId" element={<ProductDetailsPage />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="not-found" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<span>Nothig was found</span>} />
    </Routes>
  );
};
