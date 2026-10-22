import { HashRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';

import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';

import { ShopProvider } from './context/ShopContext';

import './App.scss';

export const App = () => {
  return (
    <ShopProvider>
      <HashRouter>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Footer />
      </HashRouter>
    </ShopProvider>
  );
};
