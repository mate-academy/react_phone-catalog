import { useEffect, useState } from 'react';
import { Product } from 'src/types/Types';

export const useFavourites = () => {
  const [favourites, setFavourites] = useState<Product[]>((): Product[] => {
    const savedData = localStorage.getItem('favourites');

    return savedData ? JSON.parse(savedData) : [];
  });

  const toggleFavourites = (product: Product) => {
    setFavourites(prev =>
      prev.some(item => item.id === product.id)
        ? prev.filter(item => item.id !== product.id)
        : [...prev, product],
    );
  };

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  return { favourites, toggleFavourites };
};
