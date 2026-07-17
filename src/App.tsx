import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/Header';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Footer } from './modules/Footer';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';

export const App = () => (
  <div className="App">
    <Header />

    <main className="main">
      <section className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones" element={<CatalogPage />} />
            <Route path="/tablets" element={<CatalogPage />} />
            <Route path="/accessories" element={<CatalogPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);
