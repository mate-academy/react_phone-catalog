import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './styles/index.scss';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CardPage } from './pages/CardPage'; /* ProductPage */
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { CartProvider } from './context/CartProvider';
import { FavoritesProvider } from './context/FavoriteProvider';

export const Root = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />

              <Route path=":category">
                <Route
                  index
                  element={
                    <CatalogPage title="Mobile phones" category="phones" />
                  }
                />
                <Route path=":itemId" element={<CardPage />} />
              </Route>

              <Route path="tablets">
                <Route
                  index
                  element={<CatalogPage title="Tablets" category="tablets" />}
                />

                <Route path=":itemId" element={<CardPage />} />
              </Route>

              <Route path="accessories">
                <Route
                  index
                  element={
                    <CatalogPage title="Accessories" category="accessories" />
                  }
                />

                <Route path=":itemId" element={<CardPage />} />
              </Route>

              <Route path="favorites">
                <Route index element={<FavoritesPage />} />
                <Route path=":itemId" element={<CardPage />} />
              </Route>

              <Route path="cart" element={<CartPage />} />

              <Route path=":itemId" element={<CardPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
};
