import { Provider } from 'react-redux';
import {
  HashRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { store } from './store/store';
// import { AppProvider } from './store/AppProvider/AppProvider';

import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ErrorPage } from './pages/ErrorPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { TabletsPage } from './pages/TabletsPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';

export const Root = () => (
  <Provider store={store}>
    <Router>
      {/* <AppProvider> */}
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

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

          <Route path="favorites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />

          <Route path="error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage title="Page not found" />} />
        </Route>
      </Routes>
      {/* </AppProvider> */}
    </Router>
  </Provider>

);
