import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { CatalogProducts } from '../types/Types';

interface FavouriteContextInterface {
  favourites: CatalogProducts[];
  toggleFavourite: (product: CatalogProducts) => void;
  isFavourite: (productId: CatalogProducts['id']) => boolean;
}

export const FavouritesContext = createContext<
  FavouriteContextInterface | undefined
>(undefined);

interface FavouritesProviderProps {
  children: ReactNode;
}

export const FavouritesProvider = ({ children }: FavouritesProviderProps) => {
  const [favourites, setFavourites] = useState<CatalogProducts[]>(() => {
    const savedFavourites = localStorage.getItem('favourites');

    if (savedFavourites) {
      try {
        return JSON.parse(savedFavourites);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error parsing favourite products:', error);

        return [];
      }
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = useCallback((product: CatalogProducts) => {
    setFavourites(previousFavourites => {
      const isAlreadyFavourite = previousFavourites.some(
        item => item.id === product.id,
      );

      if (isAlreadyFavourite) {
        return previousFavourites.filter(item => item.id !== product.id);
      }

      return [...previousFavourites, product];
    });
  }, []);

  const isFavourite = useCallback(
    (productId: CatalogProducts['id']) => {
      return favourites.some(item => item.id === productId);
    },
    [favourites],
  );

  const value = useMemo(
    () => ({
      favourites,
      toggleFavourite,
      isFavourite,
    }),
    [favourites, toggleFavourite, isFavourite],
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error(
      'useFavourites should be used internally FavouritesProvider',
    );
  }

  return context;
};
