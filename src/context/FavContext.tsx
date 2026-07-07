import {
  ReactNode,
  useContext,
  useEffect,
  useState,
  createContext,
} from 'react';
import { Product } from '../types/Product';

interface FavContextType {
  favourites: Product[];
  toggleFavourite: (item: Product) => void;
}

export const FavContext = createContext<FavContextType | undefined>(undefined);

export const useFavourite = () => {
  const context = useContext(FavContext);

  if (!context) {
    throw new Error('useFavourite must be used with FavouritesProvider');
  }

  return context;
};

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const [Items, setItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favourites');

    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavourite = (item: Product) => {
    setItems(prevItem => {
      const existingItem = prevItem.find(fav => fav.id === item.id);

      if (existingItem) {
        return prevItem.filter(fav => fav.id !== item.id);
      }

      return [...prevItem, item];
    });
  };

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(Items));
  }, [Items]);

  return (
    <FavContext.Provider value={{ favourites: Items, toggleFavourite }}>
      {children}
    </FavContext.Provider>
  );
};
