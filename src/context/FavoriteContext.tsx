import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Products } from '../types/Types';

type FavoritesContextType = {
  favorites: Products[];
  isFavorite: (productId: Products['id']) => boolean;
  toggleFavorite: (product: Products) => void;
};

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);

export const FavoritesProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Products[]>(() => {
    const savedFavorites = window.localStorage.getItem('favorites');

    if (savedFavorites) {
      return JSON.parse(savedFavorites);
    }

    return [];
  });

  useEffect(() => {
    window.localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback(
    (productId: Products['id']) =>
      favorites.some(item => item.id === productId),
    [favorites],
  );

  const toggleFavorite = (product: Products) => {
    setFavorites(previosFavorites => {
      const isAlreadyIncluded = previosFavorites.some(
        item => item.id === product.id,
      );

      if (isAlreadyIncluded) {
        const deletedProduct = previosFavorites.filter(
          item => item.id !== product.id,
        );

        return deletedProduct;
      }

      return [...previosFavorites, product];
    });
  };

  const vlaue = { favorites, isFavorite, toggleFavorite };

  return (
    <FavoritesContext.Provider value={vlaue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorite must be used within a FavoritesProvider');
  }

  return context;
};
