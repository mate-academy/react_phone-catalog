import React, { ReactNode, useEffect, useReducer } from 'react';
import { ActionTypes } from '../enums/ActionTypes';
import { initialState, reducer } from './state';
import { StateContext } from './context';

export const StateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavourited = localStorage.getItem('favourites');

    if (savedCart) {
      dispatch({
        type: ActionTypes.LOAD_STATE_FROM_STORAGE,
        payload: { cart: JSON.parse(savedCart) },
      });
    }

    if (savedFavourited) {
      dispatch({
        type: ActionTypes.LOAD_STATE_FROM_STORAGE,
        payload: { favourites: JSON.parse(savedFavourited) },
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(state.favourites));
  }, [state.favourites]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
