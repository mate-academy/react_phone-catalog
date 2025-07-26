// src/context/CartContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type FavouriteItem = {
  name: string;
  images: string;
  priceDiscount: number | undefined;
  priceRegular: number;
  screen: string;
  capacity: string;
  ram: string;
  id: string;
  category: string;
};

interface FavouriteContextType {
  favouriteItems: FavouriteItem[];
  addFavourite: (item: FavouriteItem) => void;
  removeFavourite: (id: string) => void;
}

const FavouriteContext = createContext<FavouriteContextType | undefined>(
  undefined,
);

const LOCAL_STORAGE_KEY = 'cartItems';

export const FavouriteProvider = ({ children }: { children: ReactNode }) => {
  const [favouriteItems, setFavouriteItems] = useState<FavouriteItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favouriteItems));
  }, [favouriteItems]);

  const addFavourite = (item: FavouriteItem) => {
    setFavouriteItems(prev => {
      return [...prev, item];
    });
  };

  const removeFavourite = (id: string) => {
    setFavouriteItems(prev => prev.filter(item => item?.id !== id));
  };

  return (
    <FavouriteContext.Provider
      value={{ favouriteItems, addFavourite, removeFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourite = () => {
  const context = useContext(FavouriteContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
