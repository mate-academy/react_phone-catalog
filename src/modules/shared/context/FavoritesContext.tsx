import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type CardProduct = {
  id: string | number;
  itemId?: string;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
  image: string;
};

type FavoritesContextValue = {
  items: CardProduct[];
  count: number;
  isFavorite: (product: Pick<CardProduct, 'id' | 'itemId'>) => boolean;
  toggleFavorite: (product: CardProduct) => void;
  removeFavorite: (product: Pick<CardProduct, 'id' | 'itemId'>) => void;
  clearFavorites: () => void;
};

const STORAGE_KEY = 'favorites';

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const getKey = (p: Pick<CardProduct, 'id' | 'itemId'>) =>
  String(p.itemId ?? p.id);

const loadFromStorage = (): CardProduct[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const FavoritesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [items, setItems] = useState<CardProduct[]>(() => loadFromStorage());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<FavoritesContextValue>(() => {
    const isFavorite = (product: Pick<CardProduct, 'id' | 'itemId'>) => {
      const key = getKey(product);

      return items.some(p => getKey(p) === key);
    };

    const removeFavorite = (product: Pick<CardProduct, 'id' | 'itemId'>) => {
      const key = getKey(product);

      setItems(prev => prev.filter(p => getKey(p) !== key));
    };

    const toggleFavorite = (product: CardProduct) => {
      const key = getKey(product);

      setItems(prev => {
        const exists = prev.some(p => getKey(p) === key);

        return exists
          ? prev.filter(p => getKey(p) !== key)
          : [...prev, product];
      });
    };

    const clearFavorites = () => setItems([]);

    return {
      items,
      count: items.length,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
    };
  }, [items]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return ctx;
};
