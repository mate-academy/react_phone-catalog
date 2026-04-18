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
      const raw = localStorage.getItem('favorites');
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
    const s = String(id);

    setFavorites(prev => (prev.includes(s) ? prev : [...prev, s]));
  }, []);
  const removeFavorite = useCallback((id: ID) => {
    const s = String(id);

    setFavorites(prev => prev.filter(x => x !== s));
  }, []);
  const toggleFavorite = useCallback((id: ID) => {
    const s = String(id);

    setFavorites(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s],
    );
  }, []);

  const isFavorite = useCallback(
    (id: ID) => favorites.includes(id),
    // Removed String(id) to strictly match the ID type
    [favorites],
  );

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
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
