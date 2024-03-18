import { Routes, Route } from 'react-router-dom';
import { App } from './App';
import { Home } from './components/pages/Home/Home';
import { Phones } from './components/pages/Phones/Phones';
import { Tablets } from './components/pages/Tablets/Tablets';
import { Accessories } from './components/pages/Accessories/Accessories';
// eslint-disable-next-line
import { ProductDetailsCard } from './components/ProductDetailsCard/ProductDetailsCard';
import { Favorites } from './components/pages/Favortes/Favorites';
import { Cart } from './components/pages/Cart/Cart';
import { PageMenu } from './components/PageMenu/PageMenu';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="phones" element={<Phones />} />
        <Route path="phones/:itemId" element={<ProductDetailsCard />} />
        <Route path="tablets" element={<Tablets />} />
        <Route path="accessories" element={<Accessories />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="cart" element={<Cart />} />
        <Route path="menu" element={<PageMenu />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
