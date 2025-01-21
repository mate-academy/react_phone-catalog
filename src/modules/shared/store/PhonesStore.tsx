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

export const PhonesContext = React.createContext<State>(initialState);
export const DispatchPhonesContext = React.createContext<DispatchType>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const PhonesProvide: React.FC<Props> = ({ children }) => {
  const [phones, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchPhonesContext.Provider value={dispatch}>
      <PhonesContext.Provider value={phones}>{children}</PhonesContext.Provider>
    </DispatchPhonesContext.Provider>
  );
};
