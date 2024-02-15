/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { Product } from '../../types/Product';
import { useLocalStorage } from '../../helpers/useLocalStorage';

type State = {
  favProducts: Product[],
  setFavProducts: (products: Product[]) => void,
  handleAddFavorites: (prod: Product) => void,
};

export const FavoriteContext = React.createContext<State>({
  favProducts: [],
  setFavProducts: () => {},
  handleAddFavorites: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const FavoriteProvider: React.FC<Props> = ({ children }) => {
  const [
    favProducts,
    setFavProducts,
  ] = useLocalStorage<Product[]>('favorites', []);

  const handleAddFavorites = (product: Product) => {
    if (favProducts.some(item => item.id === product.id)) {
      setFavProducts((currentFavorites: Product[]) => {
        return currentFavorites.filter(fav => fav.id !== product.id);
      });
    } else {
      setFavProducts((currentFavorites: Product[]) => {
        return [...currentFavorites, product];
      });
    }
  };

  const value = useMemo(() => ({
    favProducts,
    setFavProducts,
    handleAddFavorites,
  }), [favProducts]);

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
