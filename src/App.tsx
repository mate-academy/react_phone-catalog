import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Layout from './Layout';
import Home from './pages/Home/Home';
import Catalog from './components/Catalog/Catalog';
import ProductPage from './pages/ProductPage/ProductPage';
import { CartProvider } from './components/CartContext/CartContext';
import CartPage from './pages/CartPage/CartPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'; // 2. Імпортуй майбутню сторінку
import './App.scss';

function App() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all([
          fetch('/api/phones.json'),
          fetch('/api/tablets.json'),
          fetch('/api/accessories.json'),
        ]);

        const productsData: any[] = [];

        for (const res of responses) {
          if (res.ok) {
            const data = await res.json();

            if (Array.isArray(data)) {
              productsData.push(...data);
            }
          }
        }

        setAllProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <CartProvider>
      <Header />
      <main>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />

            {/* 4. Додай маршрут для сторінки Обраного */}
            <Route path="/favorites" element={<FavoritesPage />} />

            {/* Каталоги */}
            <Route
              path="/:category"
              element={<Catalog products={allProducts} />}
            />

            {/* Сторінка продукту */}
            <Route
              path="/:category/:productId"
              element={<ProductPage products={allProducts} />}
            />
          </Routes>
        </Layout>
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;

/*
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Loader from './components/Loader/Loader';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import About from './pages/About/About';
import Shedule from './pages/Shedule/Shedule';
import Tasks from './pages/Tasks/Tasks';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile'


function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
    {loading && <Loader />}
     <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shedule" element={<PrivateRoute><Shedule /></PrivateRoute>} />
          <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
          <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
           <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </>
  )
}

export default App; */
