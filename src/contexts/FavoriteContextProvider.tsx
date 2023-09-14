import { createContext, ReactNode } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type FavoriteContextProps = {
  favorites: Product[]
  addToFavorite: (product: Product) => void,
  removeFromFavorite: (productId: string) => void,
};

export const FavoriteContext = createContext<FavoriteContextProps>({
  favorites: [],
  addToFavorite: () => { },
  removeFromFavorite: () => { },
});

type Props = {
  children: ReactNode
};

export const FavoriteContextProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>(
    'favorites', [],
  );

  const addToFavorite = (product: Product) => {
    setFavorites([...favorites, product]);
  };

  const removeFromFavorite = (productId: string) => {
    setFavorites([
      ...favorites.filter(item => item.phoneId !== productId),
    ]);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorite, removeFromFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
