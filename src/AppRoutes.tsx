import { Route, Routes } from 'react-router-dom';
import { App } from './App';
import { ProductsPage } from './modules/ProductsPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { HomePage } from './modules/HomePage';
import { FavouritesPage } from './modules/FavouritesPage';
import { CartPage } from './modules/CartPage';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />

      <Route path="phones">
        <Route index element={<ProductsPage category="phones" />} />
        <Route
          path=":itemId"
          element={<ProductDetailsPage category="phones" />}
        />
      </Route>

      <Route path="tablets">
        <Route index element={<ProductsPage category="tablets" />} />
        <Route
          path=":itemId"
          element={<ProductDetailsPage category="tablets" />}
        />
      </Route>

      <Route path="accessories">
        <Route index element={<ProductsPage category="accessories" />} />
        <Route
          path=":itemId"
          element={<ProductDetailsPage category="accessories" />}
        />
      </Route>

      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
