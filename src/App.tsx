import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.scss';

export const App = () => (
  <div className="app">
    <Header />

    <main className="app__main section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/phones" element={<CatalogPage />} />
          <Route path="/tablets" element={<CatalogPage />} />
          <Route path="/accessories" element={<CatalogPage />} />

          <Route
            path="/:category/:productId"
            element={<ProductDetailsPage />}
          />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />

          <Route path="*" element={<NotFoundPage />} />

          <Route path="/home" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </main>

    <Footer />
  </div>
);
