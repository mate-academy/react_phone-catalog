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
      <div className="app-wrapper">
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
      </div>
  );
}

export default App;
