import { createContext, FunctionComponent, useMemo } from 'react';

// Hooks
import { useLocalStorage } from '../hooks/useLocalStorage';

export const FavouritesContext = createContext({
  favourites: JSON.parse(localStorage.getItem('favourites') || '[]'),
  setFavourites: (value: string[]) => {
    localStorage.setItem('favourites', JSON.stringify(value));
  },
});

export const FavouritesProvider: FunctionComponent = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage([], 'favourites');

  const contextValue = useMemo(() => {
    return {
      favourites,
      setFavourites,
    };
  }, [favourites.length]);

  return (
    <FavouritesContext.Provider value={contextValue}>
      {children}
    </FavouritesContext.Provider>
  );
};
