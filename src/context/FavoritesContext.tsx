import { createContext, useContext } from 'react';
import { useLocalStorage } from '../modules/shared/useLocalStorage';

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
  //const [ids, setIds] = useState<Set<string>>(() => new Set());
  const [idsArray, setIdsArray] = useLocalStorage<string[]>('favourites', []);
  const ids = new Set(idsArray);

  const isFavorite = (id: string) => ids.has(id);

  const toggle = (id: string) => {
    setIdsArray(prev => {
      const set = new Set(prev);

      if (set.has(id)) {
        set.delete(id);
      } else {
        set.add(id);
      }

      return Array.from(set);
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
