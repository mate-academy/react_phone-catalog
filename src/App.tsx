import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header/Header';
import { HomePage } from './Pages/HomePage';
import { Footer } from './components/Footer/Footer';
import { Catalog } from './Pages/Catalog/Catalog';
import { ItemCard } from './components/ItemCard';
import { Favorites } from './Pages/Favorites';
import { Cart } from './Pages/Cart';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <h1 className="is-hidden">Product Catalog</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:category/:product" element={<ItemCard />} />
        <Route path="/:category" element={<Catalog />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
      <Footer />
    </div>
  );
};
