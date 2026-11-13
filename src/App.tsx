import { Route, Routes } from 'react-router-dom';
import { Header } from './shared/Header';
import { Footer } from './shared/Footer';
import { HomePage } from './modules/HomePage';
import { ProductCatalogPage } from './modules/ProductCatalogPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';

export const App = () => (
  <div className="app">
    <Header />
    <main className="app-main">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:category" element={<ProductCatalogPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
    <Footer />
  </div>
);
