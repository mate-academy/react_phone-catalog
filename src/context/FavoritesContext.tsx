import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface FavoritesContextValue {
  favoriteIds: string[];
  favoritesCount: number;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
}

interface Props {
  children: ReactNode;
}

const STORAGE_KEY = 'favoriteProductIds';

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

const getStoredFavoriteIds = () => {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : [];

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    const stringIds = parsedValue.filter(
      (value): value is string => typeof value === 'string',
    );

    return Array.from(new Set(stringIds));
  } catch {
    return [];
  }
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] =
    useState<string[]>(getStoredFavoriteIds);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      // Favorites remain available for the current session.
    }
  }, [favoriteIds]);

  const toggleFavorite = useCallback((productId: string) => {
    setFavoriteIds(currentIds =>
      currentIds.includes(productId)
        ? currentIds.filter(id => id !== productId)
        : [...currentIds, productId],
    );
  }, []);

  const isFavorite = useCallback(
    (productId: string) => favoriteIds.includes(productId),
    [favoriteIds],
  );

  const value = useMemo(
    () => ({
      favoriteIds,
      favoritesCount: favoriteIds.length,
      isFavorite,
      toggleFavorite,
    }),
    [favoriteIds, isFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return context;
};
