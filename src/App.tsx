import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage/HomePage';
import { Header } from './modules/Header/Header';
import { Footer } from './modules/Footer/Footer';

import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';
import { CartPage } from './modules/CartPage/CartPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

import { TabletsPage } from './modules/TabletsPage/TabletsPage';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';

export const App = () => (
  <div className="App">
    <div id="top">
      <Header />
    </div>

    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/phones" element={<PhonesPage />} />

        <Route path="/tablets" element={<TabletsPage />} />

        <Route path="/accessories" element={<AccessoriesPage />} />

        <Route path="/favorites" element={<FavoritesPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/product/:productId" element={<ProductDetailsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
    <Footer />
  </div>
);
