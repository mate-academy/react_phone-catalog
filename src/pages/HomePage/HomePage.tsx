import { useContext, useEffect } from 'react';

import { Photos } from '../../components/Photos';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Categories } from '../../components/Catagories';
import { NewBrands } from '../../components/NewBrands';

import {
  HandleCartStorageContext,
} from '../../contexts/HandleCartStorageContext';
import {
  HandleFavouritesStorageContext,
} from '../../contexts/HandleFavouritesStorageContext';

export const HomePage = () => {
  const setCartStorage = useContext(HandleCartStorageContext);
  const setFavouritesStorage = useContext(HandleFavouritesStorageContext);

  useEffect(() => {
    setCartStorage(JSON.parse(localStorage.getItem('cart') || '[]'));
    setFavouritesStorage(
      JSON.parse(localStorage.getItem('favourites') || '[]'),
    );
  }, []);

  return (
    <main className="home page__main-container">
      <Photos />

      <ProductsSlider />

      <Categories />

      <NewBrands />
    </main>
  );
};
