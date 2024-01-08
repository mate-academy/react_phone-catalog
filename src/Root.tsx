import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './app/store';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import {
  ProductDetailsPage,
} from './pages/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';

export const Root = () => (
  <HashRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="tablets">
            <Route index element={<TabletsPage />} />
            <Route path=":productId" element={<TabletsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
            <Route path=":productId" element={<AccessoriesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="favourites">
            <Route index element={<FavouritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="cart">
            <Route index element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Provider>
  </HashRouter>
);
