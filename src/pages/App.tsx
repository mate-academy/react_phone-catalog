import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import { Layout } from '@components/Layout';
import { ROUTES } from '@routes/index';
import { HomePage } from './HomePage';
import { ProductDetailsPage } from './ProductDetailsPage';
import { FavoritesPage } from './FavoritesPage';
import { FavoritesProvider } from '@context/FavoritesContext';
import { CartProvider } from '@context/CartContext';
import { CartPage } from './CartPage';
import { ProductPage } from './ProductPage';
import { CategoryName } from '@enums/CategoryName';

export const App = () => (
  <FavoritesProvider>
    <CartProvider>
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path={ROUTES.PRODUCT_DETAILS(':category', ':productId')}
              element={<ProductDetailsPage />}
            />
            <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route
              path={ROUTES.PHONES}
              element={<ProductPage category={CategoryName.PHONES} />}
            />
            <Route
              path={ROUTES.TABLETS}
              element={<ProductPage category={CategoryName.TABLETS} />}
            />
            <Route
              path={ROUTES.ACCESSORIES}
              element={<ProductPage category={CategoryName.ACCESSORIES} />}
            />

            <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  </FavoritesProvider>
);
