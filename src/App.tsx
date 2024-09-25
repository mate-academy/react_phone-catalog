import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './Header/Header';
import { HomePage } from './HomePage/HomePage';
import './App.scss';
import { Favorites } from './Favorites/Favorites';
import { Footer } from './Footer/Footer';
import { Phones } from './Phones/Phones';
import { Tablets } from './Tablets/Tablets';
import { Accessories } from './Accessories/Accessories';
import { ItemCard } from './ItemCard/ItemCard';
import { Cart } from './Cart/Cart';
import { CartProvider } from './UseCart/UseCart';

export const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/phones" element={<Phones />} />
              <Route path="/tablets" element={<Tablets />} />
              <Route path="/product/:productId" element={<ItemCard />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};
