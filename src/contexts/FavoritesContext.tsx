import {
  createContext, FC, useEffect,
} from 'react';
import { useAsyncValue } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Product } from '../types/Product';

type ContextProps = {
  favorites: Product[],
  saveToFavorites: (product: Product) => void,
  removeFromFavorites: (productId: string) => void,
  isInFavorites: (productId: string) => boolean,
};

export const FavoritesContext = createContext<ContextProps>({
  favorites: [],
  saveToFavorites: () => { },
  removeFromFavorites: () => { },
  isInFavorites: () => false,
});

type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: FC<Props> = ({ children }) => {
  const IDs = useAsyncValue() as string[];

  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  useEffect(() => {
    const newFavorites = favorites.filter(
      ({ productId }) => IDs.includes(productId),
    );

    setFavorites(newFavorites);
  }, [IDs]);

  const isInFavorites = (id: string) => favorites.some(
    ({ productId }) => productId === id,
  );

  const saveToFavorites = (product: Product) => {
    if (isInFavorites(product.productId)) {
      return;
    }

    setFavorites(prev => [...prev, product]);
  };

  const removeFromFavorites = (productId: string) => {
    const newFavorites = favorites.filter(
      (product) => product.productId !== productId,
    );

    setFavorites(newFavorites);
  };

  const contextValue = {
    favorites,
    saveToFavorites,
    removeFromFavorites,
    isInFavorites,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
