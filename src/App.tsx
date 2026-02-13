import './styles/main.scss';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { useEffect } from 'react';
import { getProducts } from './api/httpsRequest';
import { useProducts } from './context/ProductsContext';

export const App = () => {
  const { addToDB } = useProducts();

  useEffect(() => {
    getProducts('phones').then(phones => {
      addToDB('phones', phones);
    });
    getProducts('tablets').then(tablets => {
      addToDB('tablets', tablets);
    });
    getProducts('accessories').then(accessories => {
      addToDB('accessories', accessories);
    });
    getProducts('allProducts').then(productsAll => {
      addToDB('allProducts', productsAll);
    });
  }, [addToDB]);

  return (
    <div className="App">
      <h1 className="h1">Product Catalog</h1>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
