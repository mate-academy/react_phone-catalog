import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { Footer } from './components/Footer';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/phones/:productId" element={<ProductDetailsPage />} />

          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/tablets/:productId" element={<ProductDetailsPage />} />

          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route
            path="/accessories/:productId"
            element={<ProductDetailsPage />}
          />

          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
