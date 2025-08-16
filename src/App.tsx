import React from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage/HomePage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer/Footer';

export const App = () => (
  <div className="App">
    <header className="header">
      <Header />
    </header>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <footer className="footer">
      <Footer />
    </footer>
  </div>
);
