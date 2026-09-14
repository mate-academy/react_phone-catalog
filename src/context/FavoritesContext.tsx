import { createContext, useContext } from 'react';
import { useItemIds } from '../hooks/useItemIds';

type FavoritesContextType = {
  favorites: string[];
  addFavorite: (itemId: string) => void;
  removeFavorite: (itemId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { itemIds: favorites, addItem, removeItem } = useItemIds('favorites');

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite: addItem,
        removeFavorite: removeItem,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return context;
};
