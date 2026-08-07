import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './modules/shared/components/NotFoundPage';
import { HomePage } from './modules/HomePage';
import { Phones } from './modules/Phones';
import { Tablets } from './modules/Tablets';
import { Accessories } from './modules/Accessories';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/shared/components/ProductDetailsPage';
import { Favorites } from './modules/shared/components/Favorites';
import { CartItems } from './modules/shared/components/CartItems';

const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="phones" element={<Phones />} />
          <Route path="tablets" element={<Tablets />} />
          <Route path="accessories" element={<Accessories />} />

          <Route path="product/:productId" element={<ProductDetailsPage />} />

          <Route path="favorites" element={<Favorites />} />
          <Route path="cart" element={<CartItems />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(Root());
