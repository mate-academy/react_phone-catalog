import { createStore, AnyAction, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { getPhones } from '../api';
import { Phones } from '../interfaces/interfaces';

const actions = {
  START_LOADING: 'START_LOADING',
  SET_PHONES: 'SET_PHONES',
  HAS_ERROR: 'HAS_ERROR',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  LIKE: 'LIKE',
  UNLIKE: 'UNLIKE',
};

export const startLoading = () => ({ type: actions.START_LOADING });
export const setPhones = (phones: Phones[]) => ({ type: actions.SET_PHONES, phones });
export const hasError = () => ({ type: actions.HAS_ERROR });

export const isLoading = (state: RootState) => state.loading;
export const errorState = (state: RootState) => state.error;
export const getAllPhones = (state: RootState) => state.phones;
export const getHotPriceProducts = (state: RootState) => (
  [...state.phones]
    .sort((a, b) => b.priceDiscount - a.priceDiscount)
);
export const getBrandNewProducts = (state: RootState) => (
  [...state.phones].sort((a, b) => b.year - a.year)
);

export const loadPhones = () => {
  return (dispatch: (arg0: { type: string; phones?: Phones[] }) => void) => {
    dispatch(startLoading());

    return getPhones<Phones>()
      .then(phones => dispatch(setPhones(phones)))
      .catch(() => hasError());
  };
};

export type RootState = {
  loading: boolean;
  error: boolean;
  phones: Phones[];
  cart: string[];
  favs: string[];
};

const inititalState: RootState = {
  loading: false,
  error: false,
  phones: [],
  cart: [],
  favs: [],
};

const reducer = (state = inititalState, action: AnyAction) => {
  switch (action.type) {
    case actions.START_LOADING:
      return { ...state, loading: true };

    case actions.SET_PHONES:
      return { ...state, loading: false, phones: action.phones };

    case actions.HAS_ERROR:
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

const store = createStore(
  reducer,
  inititalState,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
