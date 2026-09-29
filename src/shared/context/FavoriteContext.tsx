import { createContext, useContext, useEffect, useReducer } from 'react';
import { Product } from '../types';

export type FavoritesState = {
  favorites: Product[];
};

export type FavoritesAction = { type: 'TOGGLE_FAVORITE'; payload: Product };

export type FavoritesContextType = {
  favorites: Product[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
  totalFavorites: number;
};

export const initialFavoritesState: FavoritesState = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

function favoritesReducer(
  state: FavoritesState,
  action: FavoritesAction,
): FavoritesState {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const exists = state.favorites.some(
        product => product.id === action.payload.id,
      );

      return {
        ...state,
        favorites: exists
          ? state.favorites.filter(product => product.id !== action.payload.id)
          : [...state.favorites, action.payload],
      };
    }

    default:
      return state;
  }
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialFavoritesState);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  const totalFavorites = state.favorites.length;

  const toggleFavorite = (product: Product) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: product });
  };

  const isFavorite = (productId: string) => {
    return state.favorites.some(item => item.id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.favorites,
        isFavorite,
        toggleFavorite,
        totalFavorites,
      }}
    >
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
