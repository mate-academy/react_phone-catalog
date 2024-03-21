import React, { useEffect, useReducer, useState } from 'react';
import { debounce } from 'lodash';
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

export const useWindowSize = () => {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = debounce(() => {
      setSize(window.innerWidth);
    }, 300);

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      resizeHandler.cancel();
    };
  }, []);

  return size;
};
