import { createContext, ReactNode, useContext } from 'react';
import { ProductPage } from '../../types/ProductPage';
import { useStorageCollection } from '../../hooks/useLocalStorage/useStorageCollection';
import { ProductType } from '../../types/ProductType';

type FavoritesContextType = {
  favorites: ProductPage[];
  addToFavorites: (product: ProductPage) => void;
  removeFromFavorites: (id: ProductPage['id']) => void;
  isFavorite: (id: ProductPage['id']) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { items, add, remove, exists } =
    useStorageCollection<ProductPage>('favorites');

  return (
    <FavoritesContext.Provider
      value={{
        favorites: items,
        addToFavorites: add,
        removeFromFavorites: remove,
        isFavorite: exists,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return ctx;
};
