import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { FavouritePage } from './pages/FavouritePage';
import { CartPage } from './pages/CartPage';
import { App } from './App';
import { Path } from './types/PatchName';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { NotFound } from './components/NotFound/NotFound';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path={Path.Home} element={<Navigate to="/" replace />} />
        <Route path={Path.Phones}>
          <Route index element={<ProductPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path={Path.Tablets}>
          <Route index element={<ProductPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path={Path.Accessories}>
          <Route index element={<ProductPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path={Path.Cart} element={<CartPage />} />

        <Route path={Path.Favourites} element={<FavouritePage />} />

        <Route path="*" element={<NotFound />} />

      </Route>
    </Routes>
  );
};
