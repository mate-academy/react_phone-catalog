import React, { createContext, useContext, useEffect, useState } from 'react';

interface FavouritesContextType {
  isFavourite: (id: number) => boolean;
  toggleFavourite: (id: number) => void;
  favouritesList: number[];
  count: number;
}

const FavouritesContext = createContext<FavouritesContextType>({
  isFavourite: () => false,
  toggleFavourite: () => {},
  favouritesList: [],
  count: 0,
});

interface Props {
  children: React.ReactNode;
}

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [favouritesList, setFavouritesList] = useState<number[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favourites') || '[]') as number[];

    setFavouritesList(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favouritesList));
  }, [favouritesList]);

  const isFavourite = (id: number) => {
    return favouritesList.includes(id);
  };

  const toggleFavourite = (id: number) => {
    setFavouritesList(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const count = favouritesList.length;

  return (
    <FavouritesContext.Provider
      value={{ isFavourite, toggleFavourite, favouritesList: favouritesList, count }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
