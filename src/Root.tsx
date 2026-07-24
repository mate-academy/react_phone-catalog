import { Navigate, Route, Routes } from 'react-router-dom';
import {
  CartProvider,
  FavoritesProvider,
  ThemeProvider,
} from './modules/shared/context';
import { MainLayout } from './modules/shared/components/MainLayout';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';

export const Root = () => (
  <ThemeProvider>
    <CartProvider>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="phones" element={<PhonesPage />} />
            <Route path="tablets" element={<TabletsPage />} />
            <Route path="accessories" element={<AccessoriesPage />} />
            <Route path="product/:productId" element={<ProductDetailsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </FavoritesProvider>
    </CartProvider>
  </ThemeProvider>
);
