import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import { getProducts } from './api/products';
import { Product } from './types/Product';
import { ProductType } from './types/ProductType';
import { ProductDetailsPage }
  from './pages/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './pages/CartPage/CartPage';

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

  const phones = products.filter(
    (product) => product.type === ProductType.phone,
  );
  const tablets = products.filter(
    (product) => product.type === ProductType.tablet,
  );
  const accessories = products.filter(
    (product) => product.type === ProductType.accessory,
  );

  const suggestedProducts = [...products].sort(() => Math.random() - 0.5);

  return (
    <div className="app">
      <Header />

      <main className="main">
        <Routes>
          <Route
            path="/"
            element={(
              <HomePage
                products={products}
              />
            )}
          />
          <Route path="/phones" element={<PhonesPage phones={phones} />} />
          <Route path="/tablets" element={<TabletsPage tablets={tablets} />} />
          <Route
            path="/accessories"
            element={<AccessoriesPage accessories={accessories} />}
          />
          <Route
            path="/phones/:productId"
            element={(
              <ProductDetailsPage
                products={phones}
                suggestedProducts={suggestedProducts}
              />
            )}
          />

          <Route
            path="/tablets/:productId"
            element={(
              <ProductDetailsPage
                products={tablets}
                suggestedProducts={suggestedProducts}
              />
            )}
          />

          <Route
            path="/accessories/:productId"
            element={(
              <ProductDetailsPage
                products={accessories}
                suggestedProducts={suggestedProducts}
              />
            )}
          />

          <Route
            path="/cart"
            element={<CartPage />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
