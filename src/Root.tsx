import { AccessoriesPage } from './components/primary/AccessoriesPage/AccessoriesPage';
import { ProductPage } from './components/primary/ProductPage/ProductPage';
import { Tablets } from './components/primary/TabletsPage/Tablets';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeContent } from './components/primary/HomeContent';
import { Favourites } from './components/primary/Favourites';
import { PhonesPage } from './components/primary/PhonesPage';
import { Menu } from './components/secondary/Menu';
import { Cart } from './components/primary/Cart';
import { MainLayout } from './components/primary/MainLayout';

export const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomeContent />} />
        <Route path="phones" element={<PhonesPage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="cart" element={<Cart />} />
        <Route path="profile" element={<Menu />} />
        <Route path="tablets" element={<Tablets />} />
        <Route path="accessories" element={<AccessoriesPage />} />
      </Route>

      <Route path="*" element={<p>Page is not found</p>} />
    </Routes>
  </BrowserRouter>
);
