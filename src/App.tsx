import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';

import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

const App: React.FC = () => (
  <div className="app">
    <Header />

    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
      </Routes>
    </main>

    <Footer />
  </div>
);

export default App;
