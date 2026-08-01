import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from '@/App';
import { HomePage } from '@modules/HomePage';
import { ProductsPage } from '@modules/ProductsPage';
import { ProductDetailsPage } from '@modules/ProductDetailsPage';
import { FavouritesPage } from '@modules/FavouritesPage';
import { CartPage } from '@modules/CartPage';
import { NotFoundPage } from '@modules/NotFoundPage';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="phones" element={<ProductsPage category="phones" />} />
        <Route path="tablets" element={<ProductsPage category="tablets" />} />
        <Route
          path="accessories"
          element={<ProductsPage category="accessories" />}
        />
        <Route path="product/:productId" element={<ProductDetailsPage />} />
        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
