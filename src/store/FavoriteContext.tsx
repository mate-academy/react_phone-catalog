import {
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  createContext,
  FC,
} from 'react';

import { ProductType } from '../modules/shared/types/ProductType';

type FavoritesContextType = {
  favorites: ProductType[];
  totalFavQuantity: number;
  isInFavorite: (productId: number) => boolean;
  addToFavorites: (product: ProductType) => void;
  removeFromFavorites: (productId: number) => void;
  handleFavoriteClick: (product: ProductType) => void;
};
type Props = {
  children: ReactNode;
};
// eslint-disable-next-line prettier/prettier, max-len
export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);
export const FavoritesProvider: FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<ProductType[]>([]);
  const totalFavQuantity = favorites.length;

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: ProductType) => {
    if (!favorites.some(fav => fav.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites(favorites.filter(fav => fav.id !== productId));
  };

  const isInFavorite = (productId: number) => {
    return favorites.some(fav => fav.id === productId);
  };

  const handleFavoriteClick = (product: ProductType) => {
    if (isInFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const value = useMemo(
    () => ({
      favorites,
      totalFavQuantity,
      isInFavorite,
      addToFavorites,
      removeFromFavorites,
      handleFavoriteClick,
    }),
    [favorites, totalFavQuantity],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
