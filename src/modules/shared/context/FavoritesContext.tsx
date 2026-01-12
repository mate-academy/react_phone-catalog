import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import { Product } from '../../../api/products';

interface FavoritesContextType {
  items: Product[];
  totalFavorites: number;
  add: (product: Product) => void;
  remove: (id: string) => void;
  toggle: (product: Product) => void;
  clear: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

const FAV_KEY = 'favorites';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem(FAV_KEY);

    return saved ? JSON.parse(saved) : [];
  });

  const totalFavorites = useMemo(() => items.length, [items]);

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(items));
  }, [items]);

  const add = (product: Product) => {
    setItems(prev =>
      prev.some(i => i.id === product.id) ? prev : [...prev, product],
    );
  };

  const remove = (id: string) =>
    setItems(prev => prev.filter(i => i.id !== id));
  const toggle = (product: Product) => {
    setItems(prev =>
      prev.some(i => i.id === product.id)
        ? prev.filter(i => i.id !== product.id)
        : [...prev, product],
    );
  };

  const clear = () => setItems([]);

  return (
    <FavoritesContext.Provider
      value={{
        items,
        totalFavorites,
        add,
        remove,
        toggle,
        clear,
      }}
    >
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
