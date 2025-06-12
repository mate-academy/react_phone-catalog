import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './modules/components/Header';
import { HomePage } from './modules/pages/Home/HomePage';
import { Footer } from './modules/components/Footer';
import { ProductPage } from './modules/pages/ProductPage';
import { ProductDetail } from './modules/pages/ProductDetail';
import { Favourites } from './modules/pages/Favourites';
import { Cart } from './modules/pages/Cart';

export const App = () => (
  <div className="app">
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />

      <Route path="/phones" element={<ProductPage />} />
      <Route path="/phones/:itemId" element={<ProductDetail />} />

      <Route path="/tablets" element={<ProductPage />} />
      <Route path="/tablets/:itemId" element={<ProductDetail />} />

      <Route path="/accessories" element={<ProductPage />} />
      <Route path="/accessories/:itemId" element={<ProductDetail />} />

      <Route path="/favourites" element={<Favourites />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
    <Footer />
  </div>
);
