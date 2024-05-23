import { createContext, useEffect, useState } from 'react';
import { Product } from '../types/ProductCard';

type FavoritesContextType = {
  favoriteProducts: Product[];
  setFavoriteProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favoriteProducts: [],
  setFavoriteProducts: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  useEffect(() => {
    const favoritesFromStorage = localStorage.getItem('favoriteProducts');

    if (favoritesFromStorage) {
      setFavoriteProducts(JSON.parse(favoritesFromStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  return (
    <FavoritesContext.Provider
      value={{ favoriteProducts, setFavoriteProducts }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
