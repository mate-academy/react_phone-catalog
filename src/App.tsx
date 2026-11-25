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
import { LocalProduct } from './interface/Product';

export const App = () => {
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]'),
  );

  const [products, setProducts] = useState<LocalProduct[]>(
    JSON.parse(localStorage.getItem('cart') || '[]'),
  );

  return (
    <BrowserRouter basename="/react_phone-catalog">
      <div className="App">
        <Navbar favorites={favorites} products={products} />
        <div className="section">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  favorites={favorites}
                  setFavorites={setFavorites}
                  setProducts={setProducts}
                  products={products}
                />
              }
            />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route
              path="tablets"
              element={
                <Tablets
                  favorites={favorites}
                  setFavorites={setFavorites}
                  setProducts={setProducts}
                  products={products}
                />
              }
            />
            <Route
              path="phones"
              element={
                <Phones
                  favorites={favorites}
                  setFavorites={setFavorites}
                  setProducts={setProducts}
                  products={products}
                />
              }
            />
            <Route
              path="cart"
              element={<Cart products={products} setProducts={setProducts} />}
            />
            <Route
              path="favorites"
              element={
                <Favorites
                  favorites={favorites}
                  setFavorites={setFavorites}
                  setProducts={setProducts}
                  products={products}
                />
              }
            />
            <Route
              path="accessories"
              element={
                <Accessories
                  favorites={favorites}
                  setFavorites={setFavorites}
                  setProducts={setProducts}
                  products={products}
                />
              }
            />
            <Route
              path="/products/:product"
              element={
                <Product
                  favorites={favorites}
                  setFavorites={setFavorites}
                  setProducts={setProducts}
                  products={products}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
