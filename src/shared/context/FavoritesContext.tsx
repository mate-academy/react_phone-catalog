import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { load, save } from '../utils/storage';

type FavoritesContextValue = {
  ids: Set<string>;
  count: number;
  isFavorite: (productId: string) => boolean;
  toggle: (productId: string) => void;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const KEY = 'favorites:v1';

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ids, setIds] = useState<Set<string>>(
    () => new Set(load<string[]>(KEY, [])),
  );

  useEffect(() => {
    save(KEY, Array.from(ids));
  }, [ids]);

  const api: FavoritesContextValue = useMemo(
    () => ({
      ids,
      count: ids.size,
      isFavorite: id => ids.has(id),
      toggle: id =>
        setIds(prev => {
          const next = new Set(prev);

          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }

          return next;
        }),
      add: id => setIds(prev => new Set(prev).add(id)),
      remove: id =>
        setIds(prev => {
          const next = new Set(prev);

          next.delete(id);

          return next;
        }),
      clear: () => setIds(new Set()),
    }),
    [ids],
  );

  return (
    <FavoritesContext.Provider value={api}>
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
