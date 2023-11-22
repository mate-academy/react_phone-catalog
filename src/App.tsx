import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import './App.scss';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { CartType } from './types/CartType';
import { Phone } from './types/Phone';

import { HandleCartStorageContext } from './contexts/HandleCartStorageContext';
import { CartStorageContext } from './contexts/CartStorageContext';
import { FavouritesStorageContext } from './contexts/FavouritesStorageContext';
import {
  HandleFavouritesStorageContext,
} from './contexts/HandleFavouritesStorageContext';

const App = () => {
  const [cartStorage, setCartStorage] = useState<CartType[]>([]);
  const [favouritesStorage, setFavouritesStorage] = useState<Phone[]>([]);

  useEffect(() => {
    setCartStorage(JSON.parse(localStorage.getItem('cart') || '[]'));
    setFavouritesStorage(JSON.parse(
      localStorage.getItem('favourites') || '[]',
    ));
  }, []);

  return (
    <div className="page">
      <HandleFavouritesStorageContext.Provider value={setFavouritesStorage}>
        <FavouritesStorageContext.Provider value={favouritesStorage}>
          <HandleCartStorageContext.Provider value={setCartStorage}>
            <CartStorageContext.Provider value={cartStorage}>
              <Header />

              <Outlet />
            </CartStorageContext.Provider>
          </HandleCartStorageContext.Provider>
        </FavouritesStorageContext.Provider>
      </HandleFavouritesStorageContext.Provider>

      <Footer />
    </div>
  );
};

export default App;
