import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '@shared/hooks';

interface FavouritesContextValue {
  /** Item ids, so a favourite never holds a stale copy of the product. */
  favouriteIds: string[];
  isFavourite: (itemId: string) => boolean;
  toggleFavourite: (itemId: string) => void;
}

const FavouritesContext = createContext<FavouritesContextValue>({
  favouriteIds: [],
  isFavourite: () => false,
  toggleFavourite: () => {},
});

export const useFavourites = () => useContext(FavouritesContext);

interface Props {
  children: React.ReactNode;
}

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [favouriteIds, setFavouriteIds] = useLocalStorage<string[]>(
    'favourites',
    [],
  );

  const value = useMemo<FavouritesContextValue>(
    () => ({
      favouriteIds,

      isFavourite: (itemId: string) => favouriteIds.includes(itemId),

      toggleFavourite: (itemId: string) =>
        setFavouriteIds(current =>
          current.includes(itemId)
            ? current.filter(id => id !== itemId)
            : [...current, itemId],
        ),
    }),
    [favouriteIds, setFavouriteIds],
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
