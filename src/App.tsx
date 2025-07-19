import { useEffect, useState } from 'react';
import './App.scss';
import { NavBar } from './components/NavBar';
import { Products } from './types/Products';
import { Phones } from './types/Phones';
import { Tablets } from './types/Tablets';
import { Accessories } from './types/Accessories';
import { Footer } from './components/Footer';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { ProductsContext } from './context/ProductContext';
import { Catalog } from './components/Catalog';

export const App = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [phones, setPhones] = useState<Phones[]>([]);
  const [tablets, setTablets] = useState<Tablets[]>([]);
  const [accessories, setAccessories] = useState<Accessories[]>([]);

  useEffect(() => {
    fetch('api/products.json')
      .then(res => res.json())
      .then(setProducts)
      .catch(() => {})
      .finally(() => {});
  }, []);

  useEffect(() => {
    fetch('api/phones.json')
      .then(res => res.json())
      .then(setPhones)
      .catch(() => {})
      .finally(() => {});
  }, []);

  useEffect(() => {
    fetch('api/tablets.json')
      .then(res => res.json())
      .then(setTablets)
      .catch(() => {})
      .finally(() => {});
  }, []);

  useEffect(() => {
    fetch('api/accessories.json')
      .then(res => res.json())
      .then(setAccessories)
      .catch(() => {})
      .finally(() => {});
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, phones, tablets, accessories }}
    >
      <div className="App">
        <NavBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/phones" element={<Catalog />} />
        </Routes>

        <Footer />
      </div>
    </ProductsContext.Provider>
  );
};
