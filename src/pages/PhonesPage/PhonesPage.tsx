import { useContext, useEffect, useState } from 'react';

import { getPhones } from '../../functions/getPhones';

import { Phone } from '../../types/Phone';
import { Content } from '../../components/Content';

import {
  HandleCartStorageContext,
} from '../../contexts/HandleCartStorageContext';
import {
  HandleFavouritesStorageContext,
} from '../../contexts/HandleFavouritesStorageContext';

const title = 'Mobile phones';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Phone[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setCartStorage = useContext(HandleCartStorageContext);
  const setFavouritesStorage = useContext(HandleFavouritesStorageContext);

  useEffect(() => {
    setIsLoading(true);

    setCartStorage(JSON.parse(localStorage.getItem('cart') || '[]'));
    setFavouritesStorage(
      JSON.parse(localStorage.getItem('favourites') || '[]'),
    );

    getPhones()
      .then((products: Phone[]) => {
        setPhones(products.filter(
          product => product.category === 'phones',
        ));
      })
      .catch(() => {
        throw new Error('Loading phones error');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Content
      products={phones}
      isLoading={isLoading}
      title={title}
    />
  );
};
