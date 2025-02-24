import { createContext } from 'react';
import { useLocalStorageList } from '../../../_hooks/useLocalStorageList';

interface FavoritesContextType {
  favorites: string[];
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => true,
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    items: favorites,
    addItem,
    removeItem,
    isItemInList,
  } = useLocalStorageList<string>('favorites', []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites: id => addItem(id, i => i),
        removeFromFavorites: id => removeItem(id, i => i),
        isFavorite: id => isItemInList(id, i => i),
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
