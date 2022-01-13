import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';

import './styles/main.scss';

import { Home } from './Pages/Home/Home';
import { Cart } from './Pages/Cart/Cart';
import { Favorites } from './Pages/Favorites/Favorites';
import { PageNotFound } from './Pages/PageNotFound/PageNotFound';
import { ProductDetailsPage } from './Pages/ProductDetailsPage/ProductDetailsPage';
import { getAllDevice } from './api/api';
import { Product } from './types/Product';
import { ProductList } from './Pages/ProductList/ProductList';

const App:React.FC = () => {
  const [products, getProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      let productsFromServer = await getAllDevice();

      productsFromServer = productsFromServer.map((product: Product) => ({
        ...product,
        newPrice: product.price - ((product.price / 100) * product.discount),
        sumDiscount: product.price - (product.price - ((product.price / 100) * product.discount)),
      }));

      getProducts(productsFromServer);
    } catch {
      Promise.reject(new Error('error'));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home products={products} />}>
        <Route path="/home" element={<Navigate to="/" />} />
      </Route>
      <Route path="/phones" element={<ProductList products={products.filter(p => p.type === 'phone')} title="Mobile Phones" />} />
      <Route path="/phones/*" element={<ProductDetailsPage products={products.filter(p => p.type === 'phone')} />} />
      <Route path="/tablets" element={<ProductList products={products.filter(p => p.type === 'tablet')} title="Tablets" />} />
      <Route path="/tablets/*" element={<ProductDetailsPage products={products.filter(p => p.type === 'tablet')} />} />
      <Route path="/accessories" element={<ProductList products={products.filter(p => p.type === 'accessories')} title="Accessories" />} />
      <Route path="/accessories/*" element={<ProductDetailsPage products={products.filter(p => p.type === 'accessories')} />} />
      <Route path="/cart" element={<Cart products={products} />} />
      <Route path="/favorites" element={<Favorites products={products} />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
