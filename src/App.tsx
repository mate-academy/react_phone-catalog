import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Layout from './Layout';
import Home from './pages/Home/Home';
import Catalog from './components/Catalog/Catalog';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import './App.scss';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchProducts } from './features/products/productsSlice';

function App() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div className="loader">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app-wrapper">
      <Header />
      <main>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />

            {/* Прибираємо products={[]}, бо дані тепер у Redux */}
            <Route path="/:category" element={<Catalog />} />
            <Route path="/:category/:productId" element={<ProductPage />} />
          </Routes>
        </Layout>
      </main>
      <Footer />
    </div>
  );
}
export default App;
