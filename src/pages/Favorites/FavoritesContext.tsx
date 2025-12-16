// src/pages/Favorites/FavoritesContext.tsx
import React, {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
  PropsWithChildren,
  useEffect,
} from 'react';
import { Product } from '../../types/Product';

export interface FavoritesContextValue {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: string) => boolean;
  addFavorite: (product: Product) => void;
  removeFavorite: (id: string) => void;
}

const STORAGE_KEY = 'favorites';

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

const safeLoad = (): Product[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const FavoritesProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  // ✅ Hidrata sincronamente a partir do localStorage (evita sobrescrever com [])
  const [favorites, setFavorites] = useState<Product[]>(safeLoad);

  // ✅ Salva apenas após mudanças reais (não roda antes da hidratação)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // falha silenciosa para ambientes sem storage
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (id: string) => favorites.some(p => p.id === id),
    [favorites],
  );

  const addFavorite = useCallback((product: Product) => {
    setFavorites(prev => {
      if (prev.some(p => p.id === product.id)) {
        return prev;
      } // evita duplicados

      return [...prev, product];
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.filter(p => p.id !== id));
  }, []);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product],
    );
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
    }),
    [favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextValue => {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error(
      'useFavorites deve ser usado dentro de um FavoritesProvider',
    );
  }

  return ctx;
};
