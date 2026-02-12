import React, { useEffect, useMemo, useState } from 'react';

type FavouritesContextType = {
  favourites: string[];
  setFavourites: React.Dispatch<React.SetStateAction<string[]>>;
};

export const FavouritesContext = React.createContext<FavouritesContextType>({
  favourites: [],
  setFavourites: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useState<string[]>(
    JSON.parse(localStorage.getItem('favourites') || '[]'),
  );

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const value = useMemo(
    () => ({
      favourites,
      setFavourites,
    }),
    [favourites],
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
