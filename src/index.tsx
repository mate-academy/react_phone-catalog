import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import { ProductsProvider } from './helpers/ProductsContext';
import { NotificationProvider } from './helpers/ErrorContext';
import { LocaleStorageProvider } from './helpers/LocaleStorageContext';

import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { NoResults } from './components/NoResults';

import App from './App';

ReactDOM.render(
  <NotificationProvider>
    <ProductsProvider>
      <LocaleStorageProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route index element={<HomePage />} />
              <Route path="*" element={<NoResults text="Page not found" />} />

              <Route path="phones" element={<PhonesPage />} />
              <Route
                path="phones/:productId"
                element={<ProductDetailsPage />}
              />

              <Route path="tablets" element={<TabletsPage />} />
              <Route
                path="tablets/:productId"
                element={<ProductDetailsPage />}
              />

              <Route path="accessories" element={<AccessoriesPage />} />
              <Route
                path="accessories/:productId"
                element={<ProductDetailsPage />}
              />

              <Route path="cart" element={<CartPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </LocaleStorageProvider>
    </ProductsProvider>
  </NotificationProvider>,
  document.getElementById('root'),
);
