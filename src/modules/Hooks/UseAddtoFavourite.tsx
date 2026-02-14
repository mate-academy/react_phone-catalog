import { useState } from 'react';
import { Phone } from '../../Types/type';

export const useAddToFavourites = () => {
  const [favouriteButton, setFavouriteButton] = useState<Set<string>>(
    new Set(),
  );
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

    setFavouriteButton(prev => {
      const newSet = new Set(prev);

      if (newSet.has(product.id)) {
        newSet.delete(product.id);
      } else {
        newSet.add(product.id);
      }

      return newSet;
    });
  };

  return { favourites, toggleFavourite, favouriteButton };
};

export default useAddToFavourites;
