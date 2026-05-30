import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/product';

interface FavouritesContextType {
  favourites: Product[];
  toggleFavourite: (product: Product) => void;
  isFavourite: (id: string) => boolean;
}
const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined,
);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    const liked = localStorage.getItem('favourites');

    return liked ? JSON.parse(liked) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourite', JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = product => {
    setFavourites(prev => {
      const exists = prev.some(item => item.id === product.id);

      return exists
        ? prev.filter(item => item.id !== product.id)
        : [...prev, product];
    });
  };

  const isFavourite = productId => {
    return favourites.some(product => product.id === productId);
  };

  return (
    <FavouritesContext.Provider
      value={{ toggleFavourite, isFavourite, favourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
