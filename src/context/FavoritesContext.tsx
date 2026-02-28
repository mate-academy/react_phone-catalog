import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';

export interface BaseProduct {
  id: string | number;
}

interface FavouriteContextType {
  favourites: BaseProduct[];
  toggleFavourite: (product: BaseProduct) => void;
  isFavourite: (productId: BaseProduct['id']) => boolean;
}

export const FavouritesContext = createContext<
  FavouriteContextType | undefined
>(undefined);

interface FavouritesProviderProps {
  children: ReactNode;
}

export const FavouritesProvider = ({ children }: FavouritesProviderProps) => {
  const [favourites, setFavourites] = useState<BaseProduct[]>(() => {
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

  const toggleFavourite = useCallback((product: BaseProduct) => {
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
    (productId: BaseProduct['id']) => {
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
