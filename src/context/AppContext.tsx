/* eslint-disable no-console */
import React, {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
  Dispatch,
} from 'react';

import { Action, State } from '../types/reducerTypes';
import { appReducer } from './appReducer';
import { getProductsItem } from '../api/getProducts';
import { getInitialState } from '../utils/storage';

type AppContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    appReducer as React.Reducer<State, Action>,
    getInitialState(),
  );

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.cart));
    } catch (e) {
      console.warn('Saving items Error', e);
    }
  }, [state.cart]);

  useEffect(() => {
    try {
      localStorage.setItem('favourites', JSON.stringify(state.favourites));
    } catch (e) {
      console.warn('Saving items Error', e);
    }
  }, [state.favourites]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsItem();

        dispatch({ type: 'SET_PRODUCTS', payload: data });
      } catch (error) {
        console.error('Error loading products into AppContext', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
