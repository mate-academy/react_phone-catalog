import React, { useEffect, useReducer } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../api/products';

type Action = { type: 'setProducts'; payload: Product[] };

interface State {
  products: Product[];
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setProducts':
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
}

const initialState: State = {
  products: [],
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getProducts().then(productsFromServer => {
      dispatch({ type: 'setProducts', payload: productsFromServer });
    });
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
