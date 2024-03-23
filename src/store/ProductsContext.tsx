import React, { useEffect, useReducer } from 'react';
import { getProducts } from '../services/products';
import { State } from '../type/State';
import { Action, reducer } from './reducer';

const initialState: State = {
  products: [],
  isShowMenu: false,
  hieghtFooter: 0,
  hieghtHeader: 0,
  loading: false,
  favourites: [],
  cart: [],
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
    const data = localStorage.getItem('favorite');

    if (data === null) {
      return;
    }

    try {
      dispatch({ type: 'getFavourites', payload: JSON.parse(data) });
    } catch (e) {
      dispatch({ type: 'getFavourites', payload: [] });
    }
  }, []);

  useEffect(() => {
    const data = localStorage.getItem('cart');

    if (data === null) {
      return;
    }

    try {
      dispatch({ type: 'getCart', payload: JSON.parse(data) });
    } catch (e) {
      dispatch({ type: 'getCart', payload: [] });
    }
  }, []);

  useEffect(() => {
    dispatch({ type: 'isLoading', payload: true });

    getProducts()
      .then(productsFromServer => {
        dispatch({ type: 'getProduts', payload: productsFromServer });
      })
      .finally(() => {
        dispatch({ type: 'isLoading', payload: false });
      });
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
