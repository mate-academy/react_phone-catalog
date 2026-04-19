import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
type ID = string; // або number, підбери свій тип
type FavoritesContextType = {
  favorites: ID[];
  addFavorite: (id: ID) => void;
  removeFavorite: (id: ID) => void;
  toggleFavorite: (id: ID) => void;
  isFavorite: (id: ID) => boolean;
};
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<ID[]>(() => {
    try {
      const raw = localStorage.getItem('favorites_v1');
      const parsed = raw ? JSON.parse(raw) : [];

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.map((x: string) => String(x));
    } catch {
      return [];
    }
  });

  const addFavorite = useCallback((id: ID) => {
    const n = Number(id);

    if (!Number.isFinite(n)) {
      return;
    }

    setFavorites(prev => (prev.includes(n) ? prev : [...prev, String(n)]));
  }, []);

  const removeFavorite = useCallback((id: ID) => {
    const n = Number(id);

    if (!Number.isFinite(n)) {
      return;
    }

    setFavorites(prev => prev.filter(x => x !== String(n)));
  }, []);
  const toggleFavorite = useCallback((id: ID) => {
    const n = Number(id);

    if (!Number.isFinite(n)) {
      return;
    }

    setFavorites(prev =>
      prev.includes(String(n))
        ? prev.filter(x => x !== String(n))
        : [...prev, String(n)],
    );
  }, []);
  const isFavorite = useCallback(
    (id: ID) => {
      const n = Number(id);

      if (!Number.isFinite(n)) {
        return false;
      }

      return favorites.includes(String(n));
    },
    [favorites],
  );

  useEffect(() => {
    try {
      localStorage.setItem('favorites_v1', JSON.stringify(favorites));
    } catch (e) {
      // ignore
    }
  }, [favorites]);

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
    }),
    [favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return ctx;
};
