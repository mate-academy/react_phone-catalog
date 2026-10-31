import { createContext, useCallback, useMemo, type ReactNode } from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';

type FavouritesContextValue = {
  ids: string[];
  count: number;
  isInFavourites: (itemId: string) => boolean;
  toggleFavourites: (itemId: string) => void;
};

export const FavouritesContext = createContext<FavouritesContextValue | null>(
  null,
);

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const [ids, setIds] = useLocalStorage<string[]>('favourites', []);

  const isInFavourites = useCallback(
    (itemId: string) => ids.includes(itemId),
    [ids],
  );

  const toggleFavourites = useCallback(
    (itemId: string) => {
      setIds(current =>
        current.includes(itemId)
          ? current.filter(id => id !== itemId)
          : [...current, itemId],
      );
    },
    [setIds],
  );

  const value = useMemo(
    () => ({ ids, count: ids.length, isInFavourites, toggleFavourites }),
    [ids, isInFavourites, toggleFavourites],
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
