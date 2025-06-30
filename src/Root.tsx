import { ProductPage } from './components/primary/ProductPage/ProductPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeContent } from './components/primary/HomeContent';
import { MainLayout } from './components/primary/MainLayout';
import { Favourites } from './components/primary/Favourites';
import { Pages } from './components/primary/Pages/Pages';
import { Menu } from './components/secondary/Menu';
import { Cart } from './components/primary/Cart';

export const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="accessories" element={<Pages />} />
        <Route path="tablets" element={<Pages />} />
        <Route path="profile" element={<Menu />} />
        <Route path="phones" element={<Pages />} />
        <Route index element={<HomeContent />} />
        <Route path="cart" element={<Cart />} />
      </Route>

      <Route path="*" element={<p>Page is not found</p>} />
    </Routes>
  </BrowserRouter>
);
