import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './modules/HomePage/HomePage';
import { ProductsPage } from './modules/ProductsPage/ProductsPage';
import { CartPage } from './modules/CartPage/CartPage';
import { Header } from '../src/components/Header/Header';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductsDetailsPage/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { Footer } from './components/Footer/Footer';

export const App = () => {
  return (
    <div className="App">
      <Header />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/phones" element={<ProductsPage />} />
            <Route path="product/:productId" element={<ProductDetailsPage />} />
            <Route path="/tablets" element={<ProductsPage />} />
            <Route path="/accessories" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};
