import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Product } from './types/Product';
import './App.scss';
import { useEffect, useState } from 'react';
import { getProducts } from './api/products';
import { ProductDetails } from './types/ProductDetails';
import { getPhones } from './api/phones';
import { getTablets } from './api/tablets';
import { getAccessories } from './api/accessories';
import { CartProvider } from './context/CartContext';

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<ProductDetails[]>([]);
  const [tablets, setTablets] = useState<ProductDetails[]>([]);
  const [accessories, setAccessories] = useState<ProductDetails[]>([]);

  //#region useEffects
  useEffect(() => {
    getProducts().then(data => setProducts(data));
  }, []);

  useEffect(() => {
    getPhones().then(data => setPhones(data));
  }, []);

  useEffect(() => {
    getTablets().then(data => setTablets(data));
  }, []);

  useEffect(() => {
    getAccessories().then(data => setAccessories(data));
  }, []);

  //#endregion

  return (
    <CartProvider>
      <div className="wrapper">
        <Header />
        <Outlet context={{ products, phones, tablets, accessories }} />
        <Footer />
      </div>
    </CartProvider>
  );
};
