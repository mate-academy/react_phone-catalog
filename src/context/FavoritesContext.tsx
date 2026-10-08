/* eslint-disable @typescript-eslint/indent */

import React, { createContext, useReducer, useContext, useEffect } from 'react';

import { Product } from '../types/Product';

type FavoritesState = {
  items: Product[];
};

type FavoritesAction =
  | {
      type: 'ADD_TO_FAVORITES';
      product: Product;
    }
  | {
      type: 'REMOVE_FROM_FAVORITES';
      id: number;
    };

const initialState: FavoritesState = {
  items: [],
};

const FavoritesContext = createContext<{
  state: FavoritesState;
  dispatch: React.Dispatch<FavoritesAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

const favoritesReducer = (
  state: FavoritesState,
  action: FavoritesAction,
): FavoritesState => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      if (state.items.some(item => item.id === action.product.id)) {
        return state;
      }

      return {
        ...state,
        items: [...state.items, action.product],
      };

    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
      };

    default:
      return state;
  }
};

export const FavoritesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState, () => {
    const localData = localStorage.getItem('favorites');

    return localData ? JSON.parse(localData) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state));
  }, [state]);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
