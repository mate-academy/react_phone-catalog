import { favoritesReducer } from '@/shared/reducers/favoritesReducer';
import { Product } from '@/shared/types/Product';
import { createContext, useEffect, useReducer } from 'react';

type FavoriteContextType = {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (itemId: string) => void;
  totalFavorites: number;
};

export const FavoriteContext = createContext<FavoriteContextType>(
  {} as FavoriteContextType,
);

const initialState = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]') as Product[],
  totalFavorites: 0,
};

export const FavoriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  const addToFavorites = (product: Product) => {
    dispatch({
      type: 'add',
      product,
    });
  };

  const removeFromFavorites = (itemId: string) => {
    dispatch({
      type: 'remove',
      itemId,
    });
  };

  const totalFavorites = state.favorites.length;

  return (
    <FavoriteContext.Provider
      value={{
        favorites: state.favorites,
        addToFavorites,
        removeFromFavorites,
        totalFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
