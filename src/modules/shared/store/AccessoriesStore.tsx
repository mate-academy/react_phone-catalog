import React, { useReducer } from 'react';

import { Product } from 'src/types/Product';

type State = Product[];
type DispatchType = (action: Action) => void;
type Action = { type: 'set'; payload: Product[] };

const reducer = (state: State, action: Action) => {
  if (action.type === 'set') {
    return [...action.payload];
  }

  return state;
};

const initialState: State = [];

export const AccessoriesContext = React.createContext<State>(initialState);
export const DispatchAccessoriesContext = React.createContext<DispatchType>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const AccessoriesProvide: React.FC<Props> = ({ children }) => {
  const [phones, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchAccessoriesContext.Provider value={dispatch}>
      <AccessoriesContext.Provider value={phones}>
        {children}
      </AccessoriesContext.Provider>
    </DispatchAccessoriesContext.Provider>
  );
};
