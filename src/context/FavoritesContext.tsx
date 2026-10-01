import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Product } from '../types/Product';

const STORAGE_KEY = 'favorites';

type FavoritesContextType = {
  items: Product[];
  totalCount: number;
  isFavorite: (itemId: string) => boolean;
  toggleFavorite: (product: Product) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

const readFromStorage = (): Product[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>(readFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const isFavorite = (itemId: string) =>
    items.some(item => item.itemId === itemId);

  const toggleFavorite = (product: Product) => {
    setItems(prev => {
      if (prev.some(item => item.itemId === product.itemId)) {
        return prev.filter(item => item.itemId !== product.itemId);
      }

      return [...prev, product];
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        items,
        totalCount: items.length,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
