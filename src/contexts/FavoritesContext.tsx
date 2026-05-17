import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { readStorage, writeStorage } from '../utils/storage';

type FavoritesContextType = {
  ids: string[];
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const STORAGE_KEY = 'phone_catalog_favorites';

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [ids, setIds] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEY, []),
  );

  useEffect(() => {
    writeStorage(STORAGE_KEY, ids);
  }, [ids]);

  const value = useMemo<FavoritesContextType>(() => {
    const toggleFavorite = (itemId: string) => {
      setIds(current =>
        current.includes(itemId)
          ? current.filter(id => id !== itemId)
          : [...current, itemId],
      );
    };

    const isFavorite = (itemId: string) => ids.includes(itemId);

    return { ids, toggleFavorite, isFavorite };
  }, [ids]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return context;
}
