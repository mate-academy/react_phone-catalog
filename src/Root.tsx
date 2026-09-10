import { App } from '@/App';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { HomePage } from '@/modules/HomePage';
import { PhonesPage } from '@/modules/PhonesPage';
import { TabletsPage } from '@/modules/TabletsPage';
import { AccessoriesPage } from '@/modules/AccessoriesPage';
import { CartPage } from '@/modules/CartPage';
import { FavoritesPage } from '@/modules/FavoritesPage';
import { NotFoundPage } from '@/modules/NotFoundPage';
import { FavoritesProvider } from './shared/contexts/FavoritesContext';
import { CartProvider } from './shared/contexts/CartContext';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { Categories } from './types/Categories';

export const Root = () => (
  <Router>
    <FavoritesProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path={Categories.Phones}>
              <Route index element={<PhonesPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>
            <Route path={Categories.Tablets}>
              <Route index element={<TabletsPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>
            <Route path={Categories.Accessories}>
              <Route index element={<AccessoriesPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>
            <Route path="cart" element={<CartPage />} />
            <Route path="favorites" element={<FavoritesPage />} />

            <Route path="home" element={<Navigate to={'/'} replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </FavoritesProvider>
  </Router>
);
