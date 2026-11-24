import React, { useEffect, useMemo, useReducer } from 'react';

import { Product } from '../types/Product';
import { FavoriteItem } from '../types/FavoriteItem';

type Action =
  | { type: 'toggle'; payload: Product }
  | { type: 'remove'; payload: number }
  | { type: 'clear' };

type CartContextType = {
  favorite: FavoriteItem[];
  dispatch: React.Dispatch<Action>;
};

type Props = {
  children: React.ReactNode;
};

export const FavoriteContext = React.createContext<CartContextType | null>(
  null,
);

const reducer = (state: FavoriteItem[], action: Action): FavoriteItem[] => {
  switch (action.type) {
    case 'toggle':
      if (state.some(item => item.id === action.payload.id)) {
        return state.filter(item => item.id !== action.payload.id);
      }

      return [
        ...state,
        {
          id: action.payload.id,
          product: action.payload,
        },
      ];
    case 'remove':
      return state.filter(item => item.id !== action.payload);
    case 'clear':
      return [];

    default:
      return state;
  }
};

const init = (): FavoriteItem[] => {
  try {
    return JSON.parse(localStorage.getItem('favorite') ?? '[]');
  } catch (error) {
    return [];
  }
};

export const FavoriteProvider: React.FC<Props> = ({ children }) => {
  const [favorite, dispatch] = useReducer(reducer, [], init);

  useEffect(() => {
    localStorage.setItem('favorite', JSON.stringify(favorite));
  }, [favorite]);

  const value = useMemo(() => ({ favorite, dispatch }), [favorite]);

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
