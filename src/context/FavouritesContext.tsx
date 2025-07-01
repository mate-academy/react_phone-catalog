import React, { createContext, useContext, useEffect, useState } from 'react';

type FavouritesContextType = {
  favouriteIds: string[];
  toggleFavourite: (itemId: string) => void;
  isFavourite: (itemId: string) => boolean;
  favouritesCount: number;
};

const FavouritesContext = createContext<FavouritesContextType>({
  favouriteIds: [],
  toggleFavourite: () => {},
  isFavourite: () => false,
  favouritesCount: 0,
});

type Props = {
  children: React.ReactNode;
};

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [favouriteIds, setFavouriteIds] = useState<string[]>(
    JSON.parse(localStorage.getItem('favourites') || '[]'),
  );

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favouriteIds));
  }, [favouriteIds]);

  const toggleFavourite = (itemId: string) => {
    setFavouriteIds(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId],
    );
  };

  const isFavourite = (itemId: string) => favouriteIds.includes(itemId);

  return (
    <FavouritesContext.Provider
      value={{ favouriteIds, toggleFavourite, isFavourite, favouritesCount: favouriteIds.length }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
