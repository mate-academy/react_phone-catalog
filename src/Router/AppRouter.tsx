import { Navigate, Route, Routes } from 'react-router-dom';
import App from '../App';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { CartPage } from '../pages/CartPage';
import { NotFoundPage } from '../pages/NotFoundPage';

const productPathes = ['phones', 'tablets', 'accessories'];

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        {productPathes.map((path) => (
          <Route path={path} key={path}>
            <Route index element={<ProductsPage />} />
            <Route path=":itemId" element={<ProductDetailsPage />} />
          </Route>
        ))}

        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
