// eslint-disable-next-line import/no-extraneous-dependencies
import {
  HashRouter as Router, Route, Routes,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { App } from './App';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { FavouriteProvider } from './contexts/FavoriteContext';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { CartProvider } from './contexts/CartContext';
import {
  ProductDetailsPage,
} from './pages/ProductDetailsPage/ProductDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={(
          <FavouriteProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FavouriteProvider>
        )}
      >
        <Route index element={<HomePage />} />
        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="tablets">
          <Route index element={<TabletsPage />} />
        </Route>
        <Route path="accessories">
          <Route index element={<AccessoriesPage />} />
        </Route>
        <Route path="favourites">
          <Route index element={<FavouritesPage />} />
        </Route>
        <Route path="cart">
          <Route index element={<CartPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
