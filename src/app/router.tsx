import { Routes, Route } from 'react-router-dom';
import  Layout  from '../components/Layout';
import { Home } from '../pages/Home';
import { Catalog } from '../pages/Catalog';
import { CatalogProducts } from '../pages/CatalogProducts';
import { ProductPage } from '../pages/Product';
import { Cart } from '../pages/Cart';
import { Favorites } from '../pages/Favorites';
import { NotFound } from '../pages/NotFound';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="catalog" element={<Catalog />} />
      <Route path="catalog/:category" element={<CatalogProducts />} />
      <Route path="product/:id" element={<ProductPage />} />
      <Route path="cart" element={<Cart />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);