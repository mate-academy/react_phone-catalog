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
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { CartPage } from './components/CartPage';
import { FavoritesPage } from './components/FavoritePage';

const App: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isloading, setIsLoading] = useState(false);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getAllProducts();

      setProducts(data);
    } catch {
      Promise.reject(new Error('error'));
    } finally {
      setIsLoading(false);
    }
  };

  const phonesList = products.filter(product => product.type === 'phone');
  const tabletList = products.filter(product => product.type === 'tablet');
  const accessoriesList = products.filter(product => product.type === 'accessories');

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home products={products} />}>
        <Route path="/home" element={<Navigate to="/" />} />
      </Route>
      <Route path="/phones" element={<ProductsList products={phonesList} isloading={isloading} title="Mobile phones" />} />
      <Route path="/phones/:productId" element={<ProductDetailsPage products={phonesList} />} />
      <Route path="/tablets" element={<ProductsList products={tabletList} isloading={isloading} title="Tablets" />} />
      <Route path="/tablets/:productId" element={<ProductDetailsPage products={tabletList} />} />
      <Route path="/accessories" element={<ProductsList products={accessoriesList} isloading={isloading} title="Accessories" />} />
      <Route path="/cart" element={<CartPage products={products} />} />
      <Route path="/favorites" element={<FavoritesPage products={products} />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
