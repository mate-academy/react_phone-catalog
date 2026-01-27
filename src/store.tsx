import React, { useReducer } from 'react';

type ProductId = number;

type Action =
  | { type: 'addToCart'; payload: ProductId }
  | { type: 'deleteFromCart'; payload: ProductId }
  | { type: 'removeFromCart'; payload: ProductId }
  | { type: 'toggleFavorite'; payload: number };

interface State {
  cart: Map<number, ProductId>;
  cartTotalAmount: number;
  favorites: Set<number>;
}

function calcTotal(cart: Map<number, number>): number {
  let result = 0;

  cart.forEach(amount => {
    result += amount;
  });

  return result;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'addToCart':
      const productIdToAdd = action.payload;
      const addedLine = state.cart.get(productIdToAdd) || 0;

      if (addedLine !== undefined) {
        state.cart.set(productIdToAdd, addedLine + 1);
      }

      return { ...state, cartTotalAmount: calcTotal(state.cart) };

    case 'deleteFromCart':
      const productIdToDelete = action.payload;
      const deletedLine = state.cart.get(productIdToDelete) || 0;

      if (deletedLine > 2) {
        state.cart.set(deletedLine, deletedLine - 1);
      } else {
        state.cart.delete(productIdToDelete);
      }

      return { ...state, cartTotalAmount: calcTotal(state.cart) };

    case 'removeFromCart':
      const removedId = action.payload;

      state.cart.delete(removedId);

      return { ...state, cartTotalAmount: calcTotal(state.cart) };

    case 'toggleFavorite':
      if (state.favorites.has(action.payload)) {
        state.favorites.delete(action.payload);
      } else {
        state.favorites.add(action.payload);
      }

      return { ...state };

    default:
      return { ...state };
  }
}

const initState: State = {
  cart: new Map(),
  cartTotalAmount: 0,
  favorites: new Set(),
};

export const StateContext = React.createContext(initState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

interface Props {
  children: React.ReactNode;
}

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
