import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import AccessoryPage from './components/AccessoryPage/AccessoryPage';
import CartPage from './components/CartPage/CartPage';

import FavoritesPage from './components/FavoritesPage/FavoritesPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import PhonesPage from './components/PhonesPage/PhonesPage';
import ProductDetailsPage
  from './components/ProductDetailsPage/ProductDetailsPage';
import TabletsPage from './components/TabletsPage/TabletsPage';
import './_typography.scss';
import './_vars.scss';

const App = () => (
  <div className="app">
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="/phones" element={<PhonesPage />} />
      <Route path="/phones/*" element={<ProductDetailsPage />} />

      <Route path="/tablets" element={<TabletsPage />} />
      <Route path="/tablets/*" element={<ProductDetailsPage />} />

      <Route path="/accessory" element={<AccessoryPage />} />
      <Route path="/accessory/*" element={<ProductDetailsPage />} />

      <Route path="/cart" element={<CartPage />} />

      <Route path="/favorites" element={<FavoritesPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>

    <Footer />
  </div>
);

export default App;
