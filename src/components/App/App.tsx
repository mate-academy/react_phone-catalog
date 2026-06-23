import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProviders } from '../AppProviders';
import { AppLayout } from '../AppLayout';
import { CartPage } from '../../modules/CartPage';
import { FavoritesPage } from '../../modules/FavoritesPage';
import { HomePage } from '../../modules/HomePage';
import { NotFoundPage } from '../../modules/NotFoundPage';
import { ProductDetailsPage } from '../../modules/ProductDetailsPage';
import { ProductsPage } from '../../modules/ProductsPage';
import { Category } from '../../modules/shared/types/catalog';
import styles from './App.module.scss';

const productRoutes: { category: Category; path: string }[] = [
  { category: 'phones', path: 'phones' },
  { category: 'tablets', path: 'tablets' },
  { category: 'accessories', path: 'accessories' },
];

export const App = () => (
  <div className={styles.app}>
    <BrowserRouter>
      <AppProviders>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            {productRoutes.map(({ category, path }) => (
              <Route
                key={path}
                path={path}
                element={<ProductsPage category={category} />}
              />
            ))}
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="product/:productId" element={<ProductDetailsPage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AppProviders>
    </BrowserRouter>
  </div>
);
