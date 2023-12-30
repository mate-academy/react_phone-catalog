import {
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { CartProvider } from './context/CartContext';
import { FavProvider } from './context/FavContext';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { PhonesPage } from './pages/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <AppProvider>
    <FavProvider>
      <CartProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" />} />

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

              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="cart" element={<CartPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </CartProvider>
    </FavProvider>
  </AppProvider>
);
