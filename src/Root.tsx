import { Routes, Route, Navigate } from 'react-router-dom';
import { App } from './modules/components/App';
import { HomePage } from './modules/components/HomePage';
import { ProductListPage } from './modules/components/ProductListPage';
import { ProductItem } from './modules/components/ProductListPage/components/ProductItem';
import { Favourites } from './modules/components/Favourites';
import { Cart } from './modules/components/Cart';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path=":category" element={<ProductListPage />} />
        <Route path=":category/:productId" element={<ProductItem />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="cart" element={<Cart />} />
      </Route>
      <Route path="*" element={<span>Nothig was found</span>} />
    </Routes>
  );
};
