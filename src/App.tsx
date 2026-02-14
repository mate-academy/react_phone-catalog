import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { CategoryPage } from './pages/CategoryPage/CategoryPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

import './App.scss';

export const App = () => (
  <div className="app">
    <Header />
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<CategoryPage />} />
        <Route path="/tablets" element={<CategoryPage />} />
        <Route path="/accessories" element={<CategoryPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/:category/:productId" element={<ProductPage />} />
        <Route path="*" element={<PageNotFound message="Page not found" />} />
      </Routes>
    </main>
    <Footer />
  </div>
);
