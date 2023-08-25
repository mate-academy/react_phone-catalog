/* eslint-disable max-len */
import {
  HashRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';
import { useState } from 'react';

import Header from './components/Blocks/Header';
import Home from './components/pages/Home';
import './styles/App.scss';
import Footer from './components/Blocks/Footer';
import PhonesPage from './components/pages/PhonesPage';
import TabletsPage from './components/pages/TabletsPage';
import AccessoriesPage from './components/pages/AccessoriesPage';
import ProductPage from './components/pages/ProductPage';
import Favorite from './components/pages/Favorite';
import Cart from './components/Cart';

const PageRouter = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <Router>
      <Header setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate replace to="/" />} />

        <Route path="/phones" element={<PhonesPage searchQuery={searchQuery} />} />
        <Route path="/tablets" element={<TabletsPage searchQuery={searchQuery} />} />
        <Route path="/accessories" element={<AccessoriesPage searchQuery={searchQuery} />} />
        <Route path="/phones/:productId" element={<ProductPage />} />
        <Route path="/tablets/:productId" element={<ProductPage />} />
        <Route path="/accessories/:productId" element={<ProductPage />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/shopping-cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default PageRouter;
