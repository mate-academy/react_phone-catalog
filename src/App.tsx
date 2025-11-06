import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { FavsPage } from './pages/FavsPage/FavsPage';
import { CartPage } from './pages/CartPage/CartPage';
import { ProductDetailsPage } from './pages/ProdDetPage/ProductDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import './App.scss';

export const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/phones" element={<PhonesPage />} />
      <Route path="/favourites" element={<FavsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/:category/:productId" element={<ProductDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);
