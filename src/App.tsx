import React from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage/HomePage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer/Footer';
import { CartPage } from './modules/CartPage/CartPage';

export const App = () => (
  <div className="App">
    <header className="header">
      <Header />
    </header>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
    <footer className="footer">
      <Footer />
    </footer>
  </div>
);
