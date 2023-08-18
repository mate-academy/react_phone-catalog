import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import './App.scss';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { CartType } from './types/CartType';

import { HandleCartStorageContext } from './contexts/HandleCartStorageContext';
import { CartStorageContext } from './contexts/CartStorageContext';

const App = () => {
  const [cartStorage, setCartStorage] = useState<CartType[]>([]);

  useEffect(() => {
    setCartStorage(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  return (
    <div className="page">
      <HandleCartStorageContext.Provider value={setCartStorage}>
        <CartStorageContext.Provider value={cartStorage}>
          <Header />

          <Outlet />
        </CartStorageContext.Provider>
      </HandleCartStorageContext.Provider>

      <Footer />
    </div>
  );
};

export default App;
