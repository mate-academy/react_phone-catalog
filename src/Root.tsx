import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { Catalog } from './pages/Catalog';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { Favorites } from './pages/Favorites';
import { BASE_URL } from './utils/constants';

export const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path={`${BASE_URL}/`} element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="cart" element={<CartPage />} />
        <Route path="favourites" element={<Favorites />} />

        <Route path=":category">
          <Route index element={<Catalog />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
