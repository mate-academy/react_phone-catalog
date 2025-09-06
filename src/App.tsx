import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { Header } from './modules/shared/components/Header/Header';
import { Footer } from './modules/shared/components/Footer';
import { HomePage } from './modules/HomePage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import './App.scss';

const App: React.FC = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="App__main">
              <h1 className="App__title">Product Catalog</h1>

              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/phones"
                  element={<div>Phones Page - Coming Soon</div>}
                />
                <Route
                  path="/tablets"
                  element={<div>Tablets Page - Coming Soon</div>}
                />
                <Route
                  path="/accessories"
                  element={<div>Accessories Page - Coming Soon</div>}
                />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route
                  path="/product/:productId"
                  element={<div>Product Details - Coming Soon</div>}
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
};

export default App;
