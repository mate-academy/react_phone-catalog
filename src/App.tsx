import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Product } from './types/Product';
import { ProductDetails } from './types/productsDetails';
import { HomePage } from './pages/HomePage/HomePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productDetails, setProductDetails] = useState<ProductDetails[]>([]);

  useEffect(() => {
    fetch('api/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Помилка завантаження товарів:', error));

    Promise.all([
      fetch('api/phones.json').then(res => res.json()),
      fetch('api/tablets.json').then(res => res.json()),
      fetch('api/accessories.json').then(res => res.json()),
    ])
      .then(([phones, tablets, accessories]) => {
        setProductDetails([...phones, ...tablets, ...accessories]);
      })
      .catch(error =>
        console.error('Помилка завантаження детальних товарів:', error),
      );
  }, []);

  return (
    <div className="App">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/phones" element={<PhonesPage products={products} />} />
          <Route
            path="/tablets"
            element={<TabletsPage products={products} />}
          />
          <Route
            path="/accessories"
            element={<AccessoriesPage products={products} />}
          />
          <Route
            path="/product/:productId"
            element={
              <ProductDetailsPage
                products={productDetails}
                baseProducts={products}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/favorites"
            element={<FavouritesPage products={products} />}
          />
          <Route path="/cart" element={<CartPage products={products} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
