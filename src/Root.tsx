import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './main.scss';
import { App } from './App';
import { CardPage } from './modules/CardPage';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { CatalogPage } from './modules/CatalogPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { FavoritesProvider } from './context/FavoriteProvider';
import { CartPage } from './modules/CartPage';
import { CartProvider } from './context/CartProvider';

export const Root = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to={'/'} replace />} />

              <Route path=":itemId" element={<CardPage />} />

              <Route path="phones">
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

              <Route path="favorite">
                <Route index element={<FavoritesPage />} />

                <Route path=":itemId" element={<CardPage />} />
              </Route>

              {/* <Route path="favorite" element={<FavoritesPage />} /> */}

              <Route path="cart" element={<CartPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
};
