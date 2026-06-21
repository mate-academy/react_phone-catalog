import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Product } from './types/Product';
import './App.scss';
import { useEffect, useState } from 'react';
import { getProducts } from './api/products';

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(data => setProducts(data));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <Outlet context={products} />
      <Footer />
    </div>
  );
};
