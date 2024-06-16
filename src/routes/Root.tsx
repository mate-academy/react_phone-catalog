import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../modules/Home page/HomePage';
import { Favorites } from '../modules/Favorites page/Favorites';
import { ProductPage } from '../modules/Product pages/ProductPage';
import { ProductDetailsPage } from '../modules/Product details page';
import { CartPage } from '../modules/Shopping Cart page/CartPage';
import { NotFoundPage } from '../modules/Not found page/NotFoundPage';
import { Menu } from '../components/Navigation/components/Menu/Menu';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="menu" element={<Menu />} />
        <Route path="product/:productType" element={<ProductPage />} />
        <Route
          path="product/:productType/:productId"
          element={<ProductDetailsPage />}
        />
        <Route path="cart" element={<CartPage />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
