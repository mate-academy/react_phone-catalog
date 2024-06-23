import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import { App } from './App';
import { CartProvider } from './components/CartContext/CartContext';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { FavoritesProvider } from './components/FavoritesContext';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <CartProvider>
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route path="phones">
              <Route index element={<PhonesPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="tablets">
              <Route index element={<TabletsPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="accessories">
              <Route index element={<AccessoriesPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>

            <Route path="cart">
              <Route index element={<CartPage />} />
            </Route>

            <Route path="favorites">
              <Route index element={<FavoritesPage />} />
            </Route>

            <Route path="home" element={<Navigate to="/" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </FavoritesProvider>
  </CartProvider>
);
