// import { createContext } from 'vm';
import { createContext } from 'react';
import { Products } from '../types/Products';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type FavoriteItemContext = {
  favoritesItems: Products[];
  addToFavorites: (product: Products) => void;
  removeFromFavorites: (id: number) => void;
};

type Props = {
  children: React.ReactNode;
};

export const FavoriteContext = createContext<FavoriteItemContext>({
  favoritesItems: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

export const FavoriteProvider: React.FC<Props> = ({ children }) => {
  const [favoritesItems, setFavoritesItems] = useLocalStorage<Products[]>(
    'favoritesItems',
    [],
  );

  const addToFavorites = (product: Products) => {
    const exist = favoritesItems.some(item => item.id === product.id);

    if (exist) {
      return;
    }

    setFavoritesItems([...favoritesItems, product]);
  };

  const removeFromFavorites = (prodId: number) => {
    const newFavoritesList = favoritesItems.filter(item => item.id !== prodId);

    setFavoritesItems(newFavoritesList);
  };

  const contextValue: FavoriteItemContext = {
    favoritesItems,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContext;
