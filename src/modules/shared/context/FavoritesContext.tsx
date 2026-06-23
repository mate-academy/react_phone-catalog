import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { readStorage, writeStorage } from '../services/storage';

interface FavoritesContextValue {
  favoriteIds: string[];
  favoritesCount: number;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

const STORAGE_KEY = 'phone-catalog-favorites';

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export const FavoritesProvider = ({ children }: PropsWithChildren) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEY, []),
  );

  useEffect(() => {
    writeStorage(STORAGE_KEY, favoriteIds);
  }, [favoriteIds]);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        favoritesCount: favoriteIds.length,
        isFavorite: id => favoriteIds.includes(id),
        toggleFavorite: id =>
          setFavoriteIds(currentIds =>
            currentIds.includes(id)
              ? currentIds.filter(currentId => currentId !== id)
              : [...currentIds, id],
          ),
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
};
