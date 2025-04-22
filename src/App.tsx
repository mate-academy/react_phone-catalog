import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PhonesPage } from './components/PhonesPage/PhonesPage';
import { TabletsPage } from './components/TabletsPage/TabletsPage';
import { AccessoriesPage } from './components/AccessoriesPage/AccessoriesPage';
import { ProductPage } from './components/ProductDetailsPage';
import { FavoritesList } from './components/FavoritesList/FavoritesList';
import { CartPage } from './components/CartPage/CartPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import './App.scss';

export const App = () => (
  <ProductProvider>
    <FavoritesProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/phones" element={<PhonesPage />} />
              <Route path="/tablets" element={<TabletsPage />} />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/favorites" element={<FavoritesList />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </FavoritesProvider>
  </ProductProvider>
);
