import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CartPage } from './pages/CartPage';
import { ProductPage } from './pages/ProductPage';
import { FavoritePage } from './pages/FavoritePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

import './App.scss';

export const App = () => (
  <BrowserRouter>
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/phones" element={<CatalogPage category="Phones" />} />
      <Route path="/tablets" element={<CatalogPage category="Tablets" />} />
      <Route
        path="/accessories"
        element={<CatalogPage category="Accessories" />}
      />
      <Route path="/:category/:productId" element={<ProductPage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/favorites" element={<FavoritePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

    <Footer />
  </BrowserRouter>
);
