import './App.scss';
import React, { useState } from 'react';
import { Header } from './components/Header/header';
import { HomePage } from './pages/HomePages';
import { Footer } from './components/footer/footer';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CatalogPage } from './pages/CatalogPage';

export const App = () => (
  <Router>
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<CatalogPage />} />
          <Route path="/tablets" element={<CatalogPage />} />
          <Route path="/accessories" element={<CatalogPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  </Router>
);
