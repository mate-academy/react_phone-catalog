import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { FavProvider } from './providers/FavProvider/FavProvider';
import { CartProvider } from './providers/CartProvider/CartProvider';

import { HomePage } from './pages/HomePage/HomePage';
import { CartPage } from './pages/CartPage/CartPage';
import { ProductDetailsPage }
  from './pages/ProductDetailsPage/ProductDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import { getProducts } from './api/products';

import { Product } from './types/Product';

import './App.scss';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    try {
      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } catch {
      throw new Error('Loading Error');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="app">
      <CartProvider>
        <FavProvider>
          <Header />

          <main className="main">
            <Routes>
              <Route path="/">
                <Route index element={<HomePage products={products} />} />

                <Route path=":category">
                  <Route
                    index
                    element={<ProductsPage products={products} />}
                  />
                  <Route
                    path=":productId"
                    element={(
                      <ProductDetailsPage
                        products={products}
                      />
                    )}
                  />
                </Route>

                <Route path="cart" element={<CartPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </main>

          <Footer />
        </FavProvider>
      </CartProvider>
    </div>
  );
};

export default App;
