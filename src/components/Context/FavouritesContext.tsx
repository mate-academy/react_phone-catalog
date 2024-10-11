import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { Product } from '../type/Product';

interface FavouriteContextType {
  favouriteList: Product[] | null;
  setFavouriteList: React.Dispatch<React.SetStateAction<Product[] | null>>;
}

const FavouriteContext = createContext<FavouriteContextType | undefined>(
  undefined,
);

export const FavouriteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favouriteList, setFavouriteList] = useState<Product[] | null>(null);

  useEffect(() => {
    const savedFavourites = localStorage.getItem('favouriteList');

    if (savedFavourites) {
      setFavouriteList(JSON.parse(savedFavourites));
    } else {
      setFavouriteList([]);
    }
  }, []);

  useEffect(() => {
    if (favouriteList) {
      localStorage.setItem('favouriteList', JSON.stringify(favouriteList));
    }
  }, [favouriteList]);

  return (
    <FavouriteContext.Provider value={{ favouriteList, setFavouriteList }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourites = (): FavouriteContextType => {
  const context = useContext(FavouriteContext);

  if (context === undefined) {
    throw new Error('useFavourites must be used within a FavouriteProvider');
  }

  return context;
};
