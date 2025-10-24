/* eslint-disable max-len */
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { ProductPage } from './modules/ProductPage/ProductPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { CartPage } from './modules/CartPage/CartPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';

export const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones">
            <Route index element={<ProductPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="tablets">
            <Route index element={<ProductPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="accessories">
            <Route index element={<ProductPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);
