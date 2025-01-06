import { ReactNode, useEffect, useReducer } from 'react';
import { StateContext } from './context';
import { initialState, reducer } from './state';
import { ActionTypes } from '../enums';

export const StateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavourites = localStorage.getItem('favourites');

    if (savedCart) {
      dispatch({
        type: ActionTypes.LOAD_STATE_FROM_STORAGE,
        payload: { cart: JSON.parse(savedCart) },
      });
    }

    if (savedFavourites) {
      dispatch({
        type: ActionTypes.LOAD_STATE_FROM_STORAGE,
        payload: { favourites: JSON.parse(savedFavourites) },
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
