import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { Product } from '../types';

interface FavoritesItem {
  product: Product;
}

interface FavoritesState {
  items: FavoritesItem[];
}

type Action =
  | { type: 'ADD_ITEM'; payload: FavoritesItem }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'LOAD_FAVORITES'; payload: FavoritesItem[] };

const initialState: FavoritesState = { items: [] };

const favoritesReducer = (
  state: FavoritesState,
  action: Action,
): FavoritesState => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (
        state.items.some(item => item.product.id === action.payload.product.id)
      ) {
        return state;
      }

      return { ...state, items: [...state.items, action.payload] };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          item => item.product.id !== action.payload.id,
        ),
      };

    case 'LOAD_FAVORITES':
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

const FavoritesContext = createContext<{
  state: FavoritesState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');

    if (savedFavorites) {
      dispatch({ type: 'LOAD_FAVORITES', payload: JSON.parse(savedFavorites) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
