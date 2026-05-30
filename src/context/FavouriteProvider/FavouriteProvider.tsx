import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Product } from '../../types/Product';

interface FavouriteContextType {
  favourites: Product[];
  addFavouriteProduct: (product: Product) => void;
  removeFavouriteProduct: (itemId: string) => void;
}

export const FavouriteContext = createContext<FavouriteContextType>({
  favourites: [],
  addFavouriteProduct: () => {},
  removeFavouriteProduct: () => {},
});

interface FavouriteProviderProps {
  children: React.ReactNode;
}

const getInitialState = (): Product[] => {
  try {
    const savedFavorites = localStorage.getItem('favorites');

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch (error) {
    return [];
  }
};

export const FavouriteProvider: React.FC<FavouriteProviderProps> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<Product[]>(getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favourites));
    } catch (error) {}
  }, [favourites]);

  const addFavouriteProduct = useCallback((productToAdd: Product) => {
    setFavourites(prevFavourites => {
      if (prevFavourites.find(p => p.itemId === productToAdd.itemId)) {
        return prevFavourites;
      }

      return [...prevFavourites, productToAdd];
    });
  }, []);

  const removeFavouriteProduct = useCallback((itemIdToRemove: string) => {
    setFavourites(prevFavourites => {
      return prevFavourites.filter(
        favourite => favourite.itemId !== itemIdToRemove,
      );
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      favourites,
      addFavouriteProduct,
      removeFavouriteProduct,
    }),
    [addFavouriteProduct, favourites, removeFavouriteProduct],
  );

  return (
    <FavouriteContext.Provider value={contextValue}>
      {children}
    </FavouriteContext.Provider>
  );
};
