/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getAllProducts } from './api/api';
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/main.scss';

import { Home } from './components/Home';
import { Product } from './types/Product';
import { ProductsList } from './components/ProductsList';
import { PageNotFound } from './components/PageNotFound';

const App: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();

      setProducts(data);
    } catch {
      Promise.reject(new Error('error'));
    }
  };

  const phonesList = products.filter(product => product.type === 'phone');
  const tabletList = products.filter(product => product.type === 'tablet');

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home products={products} />}>
        <Route path="/home" element={<Navigate to="/" />} />
      </Route>
      <Route path="/phones" element={<ProductsList products={phonesList} title="Mobile phones" />} />
      <Route path="/tablets" element={<ProductsList products={tabletList} title="Tablets" />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>

  );
};

export default App;
