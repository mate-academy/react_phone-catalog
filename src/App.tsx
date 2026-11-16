import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Tablets from './pages/Tablets';
import Accessories from './pages/Accessories';
import Phones from './pages/Phones';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import Product from './pages/Product';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import { useState } from 'react';

export const App = () => {
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]'),
  );

  return (
    <BrowserRouter basename="/react_phone-catalog">
      <div className="App">
        <Navbar favorites={favorites} />
        <div className="section">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="tablets" element={<Tablets />} />
            <Route path="phones" element={<Phones />} />
            <Route path="cart" element={<Cart />} />
            <Route
              path="favorites"
              element={
                <Favorites favorites={favorites} setFavorites={setFavorites} />
              }
            />
            <Route path="accessories" element={<Accessories />} />
            <Route path="/products/:product" element={<Product />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
