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
  errorMessage: '',
  reload: false,
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
    dispatch({ type: 'errorMessage', payload: '' });
    dispatch({ type: 'reload', payload: false });

    getProducts()
      .then(productsFromServer => {
        dispatch({ type: 'getProduts', payload: productsFromServer });
      })
      .catch(() => {
        dispatch({ type: 'errorMessage', payload: 'Something went wrong' });
      })
      .finally(() => {
        dispatch({ type: 'isLoading', payload: false });
      });
  }, [state.reload]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
