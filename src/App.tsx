import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/ProductsPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { NotFoundPage } from './modules/NotFoundPage';

export const App = () => (
  <div className="App">
    <Header />
    <div className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<ProductsPage category="phones" />} />
        <Route path="/tablets" element={<ProductsPage category="tablets" />} />
        <Route
          path="/accessories"
          element={<ProductsPage category="accessories" />}
        />
        <Route path="/:category/:productId" element={<ProductDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
    <Footer />
  </div>
);
