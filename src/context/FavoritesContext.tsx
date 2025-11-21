import { createContext, useContext, useState } from 'react';

interface FavouritesContextProps {
  ids: Set<string>;
  count: number;
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => void;
}

const FavouritesContext = createContext<FavouritesContextProps | undefined>(
  undefined,
);

export const FavouritesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ids, setIds] = useState<Set<string>>(() => new Set());

  const isFavorite = (id: string) => ids.has(id);

  const toggle = (id: string) => {
    setIds(prev => {
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return newSet;
    });
  };

  const value = { ids, count: ids.size, isFavorite, toggle };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavouriteContext = () => {
  const ctx = useContext(FavouritesContext);

  if (!ctx) {
    throw new Error(
      'useFavouriteContext must be used inside <FavouritesContextProvider>',
    );
  }

  return ctx;
};
