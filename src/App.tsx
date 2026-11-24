import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

export const App = () => (
  <div className="App">
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/phones"
          element={<ProductsPage category="phones" title="Mobile phones" />}
        />
        <Route
          path="/tablets"
          element={<ProductsPage category="tablets" title="Tablets" />}
        />
        <Route
          path="/accessories"
          element={<ProductsPage category="accessories" title="Accessories" />}
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
