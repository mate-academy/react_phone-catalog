import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { Catalog } from './pages/Catalog';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { Favorites } from './pages/Favorites';

export const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path=":category">
          <Route index element={<Catalog />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="cart" element={<CartPage />} />
        <Route path="favourites" element={<Favorites />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
