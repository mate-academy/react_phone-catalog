import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import App from '@/App';
import { HomePage } from '@/pages/HomePage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ProductDetailsPage } from '@/pages/ProductDetailsPage';
import { Cart } from '@/pages/Cart';
import { Favourites } from '@/pages/Favourites';
import { NotFoundPage } from '@/pages/NotFoundPage';

import { ProductType } from '@/types/ProductType';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="phones">
          <Route
            index
            element={<ProductsPage productType={ProductType.Phone} />}
          />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="tablets">
          <Route
            index
            element={<ProductsPage productType={ProductType.Tablet} />}
          />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="accessories">
          <Route
            index
            element={<ProductsPage productType={ProductType.Accessory} />}
          />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="cart" element={<Cart />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
