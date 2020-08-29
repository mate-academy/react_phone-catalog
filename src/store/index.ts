import { createStore, AnyAction, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { getPhones, getPhone } from '../api';
import { Phones, Phone } from '../interfaces/interfaces';

const actions = {
  START_LOADING: 'START_LOADING',
  SET_PHONES: 'SET_PHONES',
  SET_PHONE: 'SET_PHONE',
  HAS_ERROR: 'HAS_ERROR',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  LIKE: 'LIKE',
  UNLIKE: 'UNLIKE',
};

export const startLoading = () => ({ type: actions.START_LOADING });
export const setPhones = (phones: Phones[]) => ({ type: actions.SET_PHONES, phones });
export const setPhone = (phone: Phone) => ({ type: actions.SET_PHONE, phone });
export const like = (phoneId: string) => ({ type: actions.LIKE, phoneId });
export const hasError = () => ({ type: actions.HAS_ERROR });

export const isLoading = (state: RootState) => state.loading;
export const errorState = (state: RootState) => state.error;
export const getAllPhones = (state: RootState) => state.phones;
export const getCurrentPhone = (state: RootState) => state.phone;
export const getHotPricePhones = (state: RootState) => (
  [...state.phones].sort((a, b) => b.priceDiscount - a.priceDiscount)
);
export const getBrandNewPhones = (state: RootState) => (
  [...state.phones].sort((a, b) => b.year - a.year)
);
export const getFavs = (state: RootState) => state.favs;

export const addFav = (state: RootState, id: string) => {
  const dublicate = state.favs.find((fav: string) => fav === id);

  if (!dublicate) {
    return { ...state, favs: [...state.favs, id] };
  }

  return { ...state, favs: state.favs.filter((fav: string) => fav !== id) };
};

export const loadPhones = () => {
  return (dispatch: (arg0: { type: string; phones?: Phones[] }) => void) => {
    dispatch(startLoading());

    return getPhones<Phones>()
      .then(phones => dispatch(setPhones(phones)))
      .catch(() => hasError());
  };
};

export const loadPhone = (id: string) => {
  return (dispatch: (arg0: { type: string; phone?: Phone }) => void) => {
    dispatch(startLoading());

    return getPhone<Phone>(id)
      .then(phone => dispatch(setPhone(phone)))
      .catch(() => hasError());
  };
};

export type RootState = {
  loading: boolean;
  error: boolean;
  phones: Phones[];
  phone: Phone;
  cart: string[];
  favs: any;
};

const inititalState: RootState = {
  loading: false,
  error: false,
  phones: [],
  phone: {
    id: '',
    namespaceId: '',
    name: '',
    capacityAvailable: [],
    capacity: '',
    priceRegular: 0,
    priceDiscount: 0,
    colorsAvailable: [],
    color: '',
    images: [],
    description: [
      {
        title: '',
        text: [],
      },
      {
        title: '',
        text: [],
      },
      {
        title: '',
        text: [],
      },
    ],
    screen: '',
    resolution: '',
    processor: '',
    ram: '',
    camera: '',
    zoom: '',
    cell: [],
  },
  cart: [],
  favs: [],
};

const reducer = (state = inititalState, action: AnyAction) => {
  switch (action.type) {
    case actions.START_LOADING:
      return { ...state, loading: true };

    case actions.SET_PHONES:
      return { ...state, loading: false, phones: action.phones };

    case actions.SET_PHONE:
      return { ...state, loading: false, phone: action.phone };

    case actions.LIKE:
      return addFav(state, action.phoneId);

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
