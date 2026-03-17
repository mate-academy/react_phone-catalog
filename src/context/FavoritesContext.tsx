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

      return raw ? (JSON.parse(raw) as ID[]) : [];
    } catch {
      return [];
    }
  });
  const addFavorite = useCallback((id: ID) => {
    setFavorites(prev => (prev.includes(id) ? prev : [...prev, id]));

  }, []);
  const removeFavorite = useCallback((id: ID) => {
    setFavorites(prev => prev.filter(x => x !== id));
  }, []);

  const toggleFavorite = useCallback((id: ID) => {
    setFavorites(prev => {
      const next = prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id];
console.log(favorites);
    //console.log( localStorage.getItem('favorites'));
      return next;
    });
  }, []);
  const isFavorite = useCallback(
    (id: ID) => {return favorites.includes(String(id))},
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
