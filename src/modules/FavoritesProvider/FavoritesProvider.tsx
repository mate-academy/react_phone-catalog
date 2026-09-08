import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export interface FavoritesItem {
  id: string;
  itemId?: string;
  name?: string;
  fullPrice?: number;
  price?: number;
  screen?: string;
  capacity?: string;
  color?: string;
  ram?: string;
  year?: number;
  image?: string;
}

interface FavoritesContextValue {
  favorites: FavoritesItem[];
  toggleFavorites: (item: Omit<FavoritesItem, 'quantity'>) => void;
  isInFavorites: (itemProductID: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoritesItem[]>(() => {
    const saved = localStorage.getItem('favoritesItems');

    if (!saved) {
      return [];
    }

    try {
      const parsed = JSON.parse(saved) as FavoritesItem[];

      return parsed.map(f => ({ ...f, itemId: f.itemId ?? f.id }));
    } catch {
      localStorage.removeItem('favoritesItems');

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favoritesItems', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorites = (item: FavoritesItem) => {
    const normalizedId = item.id ?? item.itemId ?? String(item.id);

    setFavorites(prev => {
      const exists = prev.some(
        fav => fav.id === normalizedId || fav.itemId === normalizedId,
      );

      if (exists) {
        return prev.filter(
          fav => fav.id !== normalizedId && fav.itemId !== normalizedId,
        );
      }

      const toAdd: FavoritesItem = {
        ...item,
        id: normalizedId,
        itemId: item.itemId ?? normalizedId,
      };

      return [...prev, toAdd];
    });
  };

  const isInFavorites = (itemProductID: string): boolean => {
    return favorites.some(item => item.id === itemProductID);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorites,
        isInFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use cart anywhere
export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useCart must be used within a FavoritesProvider');
  }

  return context;
};
