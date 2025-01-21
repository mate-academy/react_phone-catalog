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

export const TabletsContext = React.createContext<State>(initialState);
export const DispatchTabletsContext = React.createContext<DispatchType>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const TabletsProvide: React.FC<Props> = ({ children }) => {
  const [phones, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchTabletsContext.Provider value={dispatch}>
      <TabletsContext.Provider value={phones}>
        {children}
      </TabletsContext.Provider>
    </DispatchTabletsContext.Provider>
  );
};
