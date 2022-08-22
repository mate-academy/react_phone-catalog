import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import 'bulma';

import { ProductsProvider } from './helpers/ProductContext';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { ProductDetailsPage }
  from './pages/ProductDetailsPage/ProductDetailsPage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccesoriesPage/AccessoriesPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Footer } from './components/Footer/Footer';

const App: React.FC = () => (
  <div className="App">
    <ProductsProvider>
      <Header />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="phones" element={<PhonesPage />} />
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="product" element={<ProductDetailsPage />}>
          <Route path=":selectedProduct" element={<ProductDetailsPage />} />
        </Route>
      </Routes>
      <Footer />
    </ProductsProvider>
  </div>
);

export default App;
