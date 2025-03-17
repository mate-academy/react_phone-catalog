/* eslint-disable @typescript-eslint/indent */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface FavouritesContextType {
  favourites: string[];
  toggleFavourite: (productId: string) => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined,
);

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    const savedFavourites = JSON.parse(
      localStorage.getItem('favourites') || '[]',
    );

    setFavourites(savedFavourites);
  }, []);

  const toggleFavourite = (productId: string) => {
    let updatedFavourites;

    if (favourites.includes(productId)) {
      updatedFavourites = favourites.filter(id => id !== productId);
    } else {
      updatedFavourites = [...favourites, productId];
    }

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
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }

  return context;
};
