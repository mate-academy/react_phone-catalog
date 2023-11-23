import './App.scss';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { CatalogPage } from './pages/CatalogPage';
import { Footer } from './components/Footer';
import { CardPage } from './pages/CardPage';
import { NotFoundPage } from './pages/NoFoundPage';
import { CartPage } from './pages/CartPage';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":category" element={<CatalogPage />} />
        <Route path=":category/:id" element={<CardPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};
