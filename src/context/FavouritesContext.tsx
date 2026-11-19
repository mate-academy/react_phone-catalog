import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';

type FavouritesContextType = {
  favourites: string[];
  toggleFavourite: (id: string) => void;
};

const FavouritesContext = createContext<FavouritesContextType | null>(null);

export const FavouritesProvider = ({ children }: PropsWithChildren) => {
  const [favourites, setFavourites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('favourites') || '[]');
  });

  const toggleFavourite = (id: string) => {
    const updatedFavourites = favourites.includes(id)
      ? favourites.filter(item => item !== id)
      : [...favourites, id];

    setFavourites(updatedFavourites);

    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavorites Error');
  }

  return context;
};
