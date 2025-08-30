// src/context/FavoritesContext.tsx - Context provider for favorites functionality
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type FavsCtx = {
  ids: Set<string>;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  count: number;
};

const Ctx = createContext<FavsCtx | undefined>(undefined);
const KEY = 'favorites';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ids, setIds] = useState<Set<string>>(() => {
    try {
      return new Set<string>(JSON.parse(localStorage.getItem(KEY) || '[]'));
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(Array.from(ids)));
  }, [ids]);

  const api = useMemo<FavsCtx>(
    () => ({
      ids,
      toggle: id =>
        setIds(prev => {
          const next = new Set(prev);

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          next.has(id) ? next.delete(id) : next.add(id);

          return next;
        }),
      has: id => ids.has(id),
      count: ids.size,
    }),
    [ids],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
};

export const useFavorites = () => {
  const ctx = useContext(Ctx);

  if (!ctx) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return ctx;
};
