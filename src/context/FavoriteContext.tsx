/* eslint-disable @typescript-eslint/indent */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Product } from '../Types/types';

interface FavoriteContentType {
  favorites: FavoriteItem[];
  addToFavorite: (product: Product) => void;
  removeFromFavorite: (product: Product) => void;
  favoriteTotal: number;
}

export interface FavoriteItem {
  product: Product;
}

interface FavoriteProviderProps {
  children: ReactNode;
}

export const FavoriteContext = createContext<
  FavoriteContentType | undefined
>(undefined);

export const useFavorite = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error('Error');
  }

  return context;
};

export const FavoriteProvider = ({
  children,
}: FavoriteProviderProps) => {
  const [favorites, setFavorites] = useState<
    FavoriteItem[]
  >(() => {
    const savedFavs = localStorage.getItem('favorites');

    if (savedFavs === null) {
      return [];
    } else {
      return JSON.parse(savedFavs);
    }
  });

  useEffect(() => {
    localStorage.setItem(
      'favorites',
      JSON.stringify(favorites),
    );
  }, [favorites]);
  // #region logic

  const addToFavorite = (product: Product) => {
    setFavorites(prevFav => {
      const exist = prevFav.find(
        item => item.product.id === product.id,
      );

      if (exist) {
        return prevFav.map(item =>
          item.product.id === product.id
            ? { ...item, product }
            : item,
        );
      }

      return [...prevFav, { product }];
    });
  };

  const removeFromFavorite = (product: Product) => {
    setFavorites(preFav =>
      preFav.filter(item => item.product.id !== product.id),
    );
  };
  // #endregion

  const favoriteTotal = favorites.length;

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addToFavorite,
        removeFromFavorite,
        favoriteTotal,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
