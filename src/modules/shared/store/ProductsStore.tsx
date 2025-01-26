import React from 'react';

import { Product } from '@sTypes/Product';

import { useLocalStorageReducer } from '@hooks/useLocalStorageReducer';

interface State {
  phones: Product[];
  tablets: Product[];
  accessories: Product[];
}

type DispatchType = (action: Action) => void;
type Action = { type: 'set'; payload: Product[] };

const reducer = (state: State, action: Action) => {
  if (action.type === 'set') {
    const newState: State = {
      phones: [],
      tablets: [],
      accessories: [],
    };

    for (const product of action.payload) {
      switch (product.category) {
        case 'phones':
          newState.phones.push(product);
          break;

        case 'tablets':
          newState.tablets.push(product);
          break;

        case 'accessories':
          newState.accessories.push(product);
          break;
      }
    }

    return newState;
  }

  return state;
};

const initialState: State = {
  phones: [],
  tablets: [],
  accessories: [],
};

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
