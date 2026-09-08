import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Product } from '../types/Product';

type FavoritesContextType = {
  favoriteProducts: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (itemId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoriteProducts, setFavoriteProducts] = useLocalStorage<Product[]>(
    'favorites',
    [],
  );

  const toggleFavorite = (product: Product | null) => {
    if (!product) {
      return;
    }

    const exists = favoriteProducts.some(p => p && p.itemId === product.itemId);

    if (exists) {
      setFavoriteProducts(
        favoriteProducts.filter(p => p && p.itemId !== product.itemId),
      );
    } else {
      setFavoriteProducts([...favoriteProducts, product]);
    }
  };

  const isFavorite = (itemId: string) => {
    return favoriteProducts.some(p => p !== null && p.itemId === itemId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteProducts, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return context;
};
