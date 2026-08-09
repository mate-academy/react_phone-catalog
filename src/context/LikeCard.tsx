import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type LikeItem = {
  inden: Set<string>;
  but: (id: string) => void;
  has: (id: string) => boolean;
  count: number;
};

const LikeContext = createContext<LikeItem | undefined>(undefined);
const KEY = 'favorites';

export const LikeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [inden, setInden] = useState<Set<string>>(() => {
    try {
      return new Set<string>(JSON.parse(localStorage.getItem(KEY) || '[]'));
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(Array.from(inden)));
  }, [inden]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const api: LikeItem = useMemo(
    () => ({
      inden,
      but: id =>
        setInden(pr => {
          const next = new Set(pr);

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          next.has(id) ? next.delete(id) : next.add(id);

          return next;
        }),

      has: id => inden.has(id),
      count: inden.size,
    }),
    [inden],
  );

  return <LikeContext.Provider value={api}>{children}</LikeContext.Provider>;
};

export const useLikeProducts = () => {
  const like = useContext(LikeContext);

  if (!like) {
    throw new Error('ERROR');
  }

  return like;
};
