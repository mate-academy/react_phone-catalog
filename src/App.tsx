import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './Header/Header';
import { HomePage } from './HomePage/HomePage';
import './App.scss';
import { Favorites } from './Favorites/Favorites';
import { Footer } from './Footer/Footer';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};
