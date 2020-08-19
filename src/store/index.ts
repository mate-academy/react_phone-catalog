import { createStore, AnyAction, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { Phones } from '../interfaces/interfaces';

const actions = {
  SET_PHONES: 'SET_PHONES',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  LIKE: 'LIKE',
  UNLIKE: 'UNLIKE',
};

export const setPhones = (phones: Phones[]) => ({ type: actions.SET_PHONES, phones });
export const addToCart = (phoneId: string) => ({ type: actions.ADD_TO_CART, phoneId });
export const removeFromCart = (phoneId: string) => ({ type: actions.REMOVE_FROM_CART, phoneId });
export const like = (phoneId: string) => ({ type: actions.LIKE, phoneId });
export const unlike = (phoneId: string) => ({ type: actions.UNLIKE, phoneId });

export const getHotPriceProducts = (state: RootState) => (
  [...state.phones]
    .sort((a, b) => b.priceDiscount - a.priceDiscount)
);
export const getBrandNewProducts = (state: RootState) => (
  [...state.phones].sort((a, b) => b.year - a.year)
);

export type RootState = {
  phones: Phones[];
  cart: string[];
  favs: string[];
};

const inititalState: RootState = {
  phones: [],
  cart: [],
  favs: [],
};

const reducer = (state = inititalState, action: AnyAction) => {
  switch (action.type) {
    case actions.SET_PHONES:
      return { ...state, phones: action.phones };

    case actions.ADD_TO_CART:
      return {
        ...state,
      };

    case actions.REMOVE_FROM_CART:
      return {
        ...state,
      };

    case actions.LIKE:
      return {
        ...state,
      };

    case actions.UNLIKE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
