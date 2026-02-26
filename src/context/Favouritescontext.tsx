import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export type FavouriteProduct = {
  id: string;
  image: string;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
};

type FavouritesContextType = {
  favourites: FavouriteProduct[];
  isFavourite: (id: string) => boolean;
  toggleFavourite: (product: FavouriteProduct) => void;
};

const FavouritesContext = createContext<FavouritesContextType>({
  favourites: [],
  isFavourite: () => false,
  toggleFavourite: () => {},
});

const STORAGE_KEY = 'favourites';

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<FavouriteProduct[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const isFavourite = (id: string) => favourites.some(item => item.id === id);

  const toggleFavourite = (product: FavouriteProduct) => {
    setFavourites(prev =>
      isFavourite(product.id)
        ? prev.filter(item => item.id !== product.id)
        : [...prev, product],
    );
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, isFavourite, toggleFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
