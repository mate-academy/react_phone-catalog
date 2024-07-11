/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useContext, useEffect } from 'react';
import { getProducts } from './data/httpClient';
import { ProductContext } from './contexts/ProductContextProvider';
import { CardType } from './types/Card';
import MenuPage from './components/MenuPage';

export const App = () => {
  const { setCards } = useContext(ProductContext);

  useEffect(() => {
    getProducts({ url: 'api/products.json', method: 'GET' }).then(res => {
      const d = res as CardType[];

      setCards(d);
    });
  }, []);

  return (
    <>
      <Navbar />

      <MenuPage />

      <Outlet />

      <Footer />
    </>
  );
};
