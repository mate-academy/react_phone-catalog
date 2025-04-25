import React, { useEffect, useReducer } from 'react';
import { AllProducts } from '../types/AllProducts/AllProducts';

export type Action =
  | { type: 'addFavoritesProduct'; payload: AllProducts }
  | { type: 'deleteFavoritesProduct'; payload: number };

const reducer = (state: AllProducts[], action: Action) => {
  switch (action.type) {
    case 'addFavoritesProduct':
      return [...state, action.payload];
    case 'deleteFavoritesProduct':
      return state.filter(product => product.id !== action.payload);

    default:
      return state;
  }
};

const loadStateFromLocalStorage = () => {
  const savedItems = localStorage.getItem('favorites');

  if (savedItems) {
    return JSON.parse(savedItems);
  }

  return [];
};

export const FavoritesStateContext = React.createContext<AllProducts[]>([]);
export const FavoritesDispatchContext = React.createContext<
  React.Dispatch<Action>
>(() => {});

export type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, loadStateFromLocalStorage());

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state));
  }, [state]);

  return (
    <FavoritesDispatchContext.Provider value={dispatch}>
      <FavoritesStateContext.Provider value={state}>
        {children}
      </FavoritesStateContext.Provider>
    </FavoritesDispatchContext.Provider>
  );
};
