// #region imports
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './i18n';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ProductPage } from './modules/ProductPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { ShoppingCartPage } from './modules/ShoppingCartPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ThemeProvider } from './modules/shared/services/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './store';
// #endregion

export const Root = () => (
  <Provider store={store}>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route path="home" element={<Navigate to="../" />} />

            <Route
              path="phones"
              element={<ProductPage category="phones" key="phones" />}
            />

            <Route
              path="tablets"
              element={<ProductPage category="tablets" key="tablets" />}
            />

            <Route
              path="accessories"
              element={<ProductPage category="accessories" key="accessories" />}
            />

            <Route path="product/:productId" element={<ProductDetailsPage />} />

            <Route path="favorites" element={<FavoritesPage />} />

            <Route path="cart" element={<ShoppingCartPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  </Provider>
);
