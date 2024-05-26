import { createContext, useEffect, useState } from 'react';
import { Product } from '../types/ProductCard';

type FavoritesContextType = {
  favoriteProducts: Product[];
  setFavoriteProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addToFavorites: (newFavoriteProduct: Product) => void;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favoriteProducts: [],
  setFavoriteProducts: () => {},
  addToFavorites: () => {},
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

  const addToFavorites = (newFavoriteProduct: Product) => {
    if (
      favoriteProducts.some(
        (prod: Product) => prod.id === newFavoriteProduct.id,
      )
    ) {
      setFavoriteProducts((currentFavorites: Product[]) => {
        return currentFavorites.filter(
          (prod: Product) => prod.id !== newFavoriteProduct.id,
        );
      });
    } else {
      setFavoriteProducts((currentFavorites: Product[]) => [
        ...currentFavorites,
        newFavoriteProduct,
      ]);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteProducts, setFavoriteProducts, addToFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
