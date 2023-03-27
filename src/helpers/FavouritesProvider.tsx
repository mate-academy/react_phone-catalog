import { createContext, FC, useMemo } from 'react';

import { useLocalStorage } from '../utils/useLocalStorage';

export const FavouritesContext = createContext({
  favourites: JSON.parse(localStorage.getItem('favourites') || '[]'),
  setFavourites: (value: string[]) => {
    localStorage.setItem('favourites', JSON.stringify(value));
  },
});

export const FavouritesProvider: FC = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage<string[]>(
    'favourites',
    [],
  );

  const contextValue = useMemo(() => {
    return {
      favourites,
      setFavourites,
    };
  }, [favourites]);

  return (
    <FavouritesContext.Provider value={contextValue}>
      {children}
    </FavouritesContext.Provider>
  );
};
