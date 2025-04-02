import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import { Layout } from '@components/Layout';
import { ROUTES } from '@routes/index';
import { HomePage } from './HomePage';
import { ProductDetailsPage } from './ProductDetailsPage';
import { FavoritesPage } from './FavoritesPage';
import { FavoritesProvider } from '@context/FavoritesContext';
import { CartProvider } from '@context/CartContext';
import { CartPage } from './CartPage';

export const App = () => (
  <FavoritesProvider>
    <CartProvider>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path={ROUTES.PRODUCT_DETAILS(':category', ':productId')}
            element={<ProductDetailsPage />}
          />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </CartProvider>
  </FavoritesProvider>
);
