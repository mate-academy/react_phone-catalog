import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.scss';
import './styles/main.scss';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ItemPage } from './pages/ItemPage';
import { FavoritePage } from './pages/FavoritePage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { App } from './App';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { CartProvider } from './contexts/cartContext';

export const Root = () => (
  <Router>
    <ProductsProvider>
      <CartProvider>
        <FavoritesProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />

              <Route path="phones">
                <Route index element={<CatalogPage />} />
                <Route path=":itemId" element={<ItemPage />} />
              </Route>

              <Route path="tablets">
                <Route index element={<CatalogPage />} />
                <Route path=":itemId" element={<ItemPage />} />
              </Route>

              <Route path="accessories">
                <Route index element={<CatalogPage />} />
                <Route path=":itemId" element={<ItemPage />} />
              </Route>

              <Route path="favorites" element={<FavoritePage />} />
              <Route path="cart" element={<CartPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </FavoritesProvider>
      </CartProvider>
    </ProductsProvider>
  </Router>
);
