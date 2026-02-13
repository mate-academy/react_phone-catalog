import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { FavoriteItem, Product } from '../types';

interface FavoritesState {
  items: FavoriteItem[];
}

type FavoritesAction =
  | { type: 'ADD_FAVORITE'; payload: Product }
  | { type: 'REMOVE_FAVORITE'; payload: string };

interface FavoritesContextType {
  state: FavoritesState;
  dispatch: React.Dispatch<FavoritesAction>;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

function favoritesReducer(
  state: FavoritesState,
  action: FavoritesAction,
): FavoritesState {
  switch (action.type) {
    case 'ADD_FAVORITE':
      const existingItem = state.items.find(
        item => item.product.id === action.payload.id,
      );

      if (existingItem) {
        return state;
      }

      return {
        items: [
          ...state.items,
          {
            id: Math.random().toString(),
            product: action.payload,
          },
        ],
      };

    case 'REMOVE_FAVORITE':
      return {
        items: state.items.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, { items: [] });

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');

    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);

        if (parsedFavorites && parsedFavorites.items) {
          parsedFavorites.items.forEach((item: FavoriteItem) => {
            dispatch({ type: 'ADD_FAVORITE', payload: item.product });
          });
        }
      } catch (error) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state));
  }, [state]);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
}
