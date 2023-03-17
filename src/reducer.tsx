import React, { createContext, useReducer } from 'react';
import { Product } from './types/product';

type State = {
  catalogsProducts: Product[] | []
};

export type Action = {
  type: 'addCatalog', list: Product[]
};

export const initialState: State = {
  catalogsProducts: [],
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'addCatalog':
      return {
        ...state,
        catalogsProducts: action.list,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext<
[State, React.Dispatch<Action>]
>([initialState, (obj:Action) => obj]);

const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};

export default StateProvider;
