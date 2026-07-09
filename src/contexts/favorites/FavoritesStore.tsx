import React, { useEffect, useReducer } from 'react';
import { ProductPreview } from '../../types';

type Action =
  | { type: 'add'; payload: ProductPreview }
  | { type: 'remove'; payload: string };

interface State {
  favorites: ProductPreview[];
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case 'remove':
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
}

const initialState: State = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

export const FavContext = React.createContext<State>(initialState);
export const FavDispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  return (
    <FavDispatchContext.Provider value={dispatch}>
      <FavContext.Provider value={state}>{children}</FavContext.Provider>
    </FavDispatchContext.Provider>
  );
};
