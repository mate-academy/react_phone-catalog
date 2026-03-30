import React, { useContext, useEffect, useReducer } from 'react';
import { Product } from '../types/Product';

interface FavoritesState {
  favItems: Product[];
}

type Action =
  | { type: 'TOGGLE_FAVORITE'; payload: Product }
  | { type: 'CLEAR_FAVORITES' };

function favoritesReducer(
  state: FavoritesState,
  action: Action,
): FavoritesState {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const isExist = state.favItems.some(
        item => item.itemId === action.payload.itemId,
      );

      if (isExist) {
        return {
          ...state,
          favItems: state.favItems.filter(
            item => item.itemId !== action.payload.itemId,
          ),
        };
      } else {
        return {
          ...state,
          favItems: [...state.favItems, action.payload],
        };
      }
    }

    case 'CLEAR_FAVORITES':
      return {
        ...state,
        favItems: [],
      };

    default:
      return state;
  }
}

const initialState: FavoritesState = {
  favItems: JSON.parse(localStorage.getItem('favourites') || '[]'),
};

export const FavoritesStateContext = React.createContext<FavoritesState>(null!);
export const FavoritesDispatchContext = React.createContext<
  React.Dispatch<Action>
>(() => {});

export const useFavoritesState = () => {
  const context = useContext(FavoritesStateContext);

  if (!context) {
    throw new Error('State Error');
  }

  return context;
};

export const useFavoritesDispatch = () => {
  const context = useContext(FavoritesDispatchContext);

  if (!context) {
    throw new Error('Dispatch Error');
  }

  return context;
};

type Props = {
  children: React.ReactNode;
};

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(state.favItems));
  }, [state.favItems]);

  return (
    <FavoritesDispatchContext.Provider value={dispatch}>
      <FavoritesStateContext.Provider value={state}>
        {children}
      </FavoritesStateContext.Provider>
    </FavoritesDispatchContext.Provider>
  );
};
