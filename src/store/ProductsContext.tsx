import React, { useEffect, useReducer } from 'react';
import { getProducts } from '../api';
import { State } from '../type/State';
import { Action, reducer } from './reducer';

const initialState: State = {
  products: [],
  isShowMenu: false,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getProducts().then(productsFromServer => {
      dispatch({ type: 'getProduts', payload: productsFromServer });
    });
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
