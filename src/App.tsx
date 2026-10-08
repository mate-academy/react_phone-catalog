import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Home } from './pages/Home/Home';
import { Phones } from './pages/Phones/Phones';
import { Tablets } from './pages/Tablets/Tablets';
import { Accessories } from './pages/Accessories/Accessories';
import { ProductDetails } from './pages/ProductDetails/ProductDetails';
import { Cart } from './pages/Cart/Cart';
import { Favorites } from './pages/Favorites/Favorites';
import { NotFound } from './pages/NotFound/NotFound';

import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CartProvider>
          <FavoritesProvider>
            <Router basename={import.meta.env.BASE_URL}>
              <Header />

              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/phones" element={<Phones />} />
                  <Route path="/tablets" element={<Tablets />} />
                  <Route path="/accessories" element={<Accessories />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              <Footer />
            </Router>
          </FavoritesProvider>
        </CartProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};
