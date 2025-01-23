import React from 'react';

import { Product } from '@sTypes/Product';

import { useLocalStorageReducer } from '@hooks/useLocalStorageReducer';

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

export const ProductsContext = React.createContext<State>(initialState);
export const DispatchProductsContext = React.createContext<DispatchType>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const ProductsProvide: React.FC<Props> = ({ children }) => {
  const [accessories, dispatch] = useLocalStorageReducer<State, Action>(
    'products',
    reducer,
    initialState,
  );

  return (
    <DispatchProductsContext.Provider value={dispatch}>
      <ProductsContext.Provider value={accessories}>
        {children}
      </ProductsContext.Provider>
    </DispatchProductsContext.Provider>
  );
};
