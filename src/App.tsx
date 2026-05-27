import './styles/App.scss';
import { Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { HomePage } from './modules/HomePage/HomePage';
import { Footer } from './components/shared/Footer';
import { Navbar } from './components/shared/Navbar';
import { ProductsPage } from './modules/ProductsPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { Product } from './types/Product';
import { getData } from './utils/getData';
import { ProductDetailsPage } from './modules/ProductDetailsPage/components';
import { CartPage } from './modules/CartPage';
import { CartProvider } from './context/CartContext';
import { FavoriteProvider } from './context/FavoriteContext';

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');

    getData<Product[]>('/products')
      .then(data => setProducts(data))
      .catch(err => setError(err.message || 'Oops'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app">
      <CartProvider>
        <FavoriteProvider>
          <Navbar />

          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    products={products}
                    loading={loading}
                    error={error}
                  />
                }
              />
              <Route
                path="/phones"
                element={
                  <ProductsPage
                    key="phones"
                    category="phones"
                    products={products.filter(
                      elem => elem.category === 'phones',
                    )}
                    loading={loading}
                    error={error}
                  />
                }
              />
              <Route
                path="/tablets"
                element={
                  <ProductsPage
                    key="tablets"
                    category="tablets"
                    products={products.filter(
                      elem => elem.category === 'tablets',
                    )}
                    loading={loading}
                    error={error}
                  />
                }
              />
              <Route
                path="/accessories"
                element={
                  <ProductsPage
                    key="accessories"
                    category="accessories"
                    products={products.filter(
                      elem => elem.category === 'accessories',
                    )}
                    loading={loading}
                    error={error}
                  />
                }
              />

              <Route
                path="/:category/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/favorite"
                element={
                  <ProductsPage
                    key="favorite"
                    category="favorite"
                    products={products}
                    loading={false}
                    error={''}
                  />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </FavoriteProvider>
      </CartProvider>

      <Footer />
    </div>
  );
};
