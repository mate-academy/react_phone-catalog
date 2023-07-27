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

  const phones = products.filter(product => product.type === ProductType.phone);
  const tablets = products.filter(
    product => product.type === ProductType.tablet,
  );
  const accessories = products.filter(
    product => product.type === ProductType.accessory,
  );

  return (
    <div className="app">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/phones" element={<PhonesPage phones={phones} />} />
          <Route path="/tablets" element={<TabletsPage tablets={tablets} />} />
          <Route
            path="/accessories"
            element={<AccessoriesPage accessories={accessories} />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
