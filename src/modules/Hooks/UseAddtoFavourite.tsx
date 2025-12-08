import { useState } from 'react';
import { Phone } from '../../Types/type';

export const useAddToFavourites = () => {
  const [favourites, setAddToFavourites] = useState<Phone[]>([]);

  const toggleFavourite = (product: Phone) => {
    setAddToFavourites(prev => {
      const exists = prev.some(item => item.id === product.id);

      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  return { favourites, toggleFavourite };
};

export default useAddToFavourites;
