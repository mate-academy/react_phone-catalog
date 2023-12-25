import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import App from './App';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductType } from './types/ProductType';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="phones">
            <Route
              index
              element={<ProductsPage productType={ProductType.PHONE} />}
            />

            <Route
              path=":productId"
              element={<ProductDetailsPage />}
            />
          </Route>

          <Route path="tablets">
            <Route
              index
              element={<ProductsPage productType={ProductType.TABLET} />}
            />

            <Route
              path=":productId"
              element={<ProductDetailsPage />}
            />
          </Route>

          <Route path="accessories">
            <Route
              index
              element={<ProductsPage productType={ProductType.ACCESSORY} />}
            />

            <Route
              path=":productId"
              element={<ProductDetailsPage />}
            />
          </Route>

          <Route path="cart" element={<CartPage />} />

          <Route path="favourites" element={<FavouritesPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>

);
