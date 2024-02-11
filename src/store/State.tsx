import React, { useReducer } from 'react';

type State = {
  favoriteProducts: string[];
};

const initialState: State = {
  favoriteProducts: [],
};

type Action
  = { type: 'addFavorite', payload: string }
  | { type: 'removeFavorite', payload: string }
  | { type: 'updateFavorite', payload: string[] };

type Props = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addFavorite':
      return {
        ...state,
        favoriteProducts: [...state.favoriteProducts, action.payload],
      };

    case 'removeFavorite':
      return {
        ...state,
        favoriteProducts: state.favoriteProducts
          .filter(item => item !== action.payload),
      };

    case 'updateFavorite':
      return {
        ...state,
        favoriteProducts: [...action.payload],
      };

    default:
      return state;
  }
}

export const StateContext = React.createContext(initialState);

export const DispatchContext
  = React.createContext<React.Dispatch<Action>>(() => { });

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
