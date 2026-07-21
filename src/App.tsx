import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CategoryPage } from './components/CategoryPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { CartPage } from './components/CartPage';
import { FavoritesPage } from './components/FavoritesPage';
import { NotFoundPage } from './components/NotFoundPage';
import { HomePage } from './components/HomePage';

export const App = () => (
  <div className="App">
    <Header />
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<CategoryPage category="phones" />} />
        <Route path="/tablets" element={<CategoryPage category="tablets" />} />
        <Route
          path="/accessories"
          element={<CategoryPage category="accessories" />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
    <Footer />
  </div>
);
