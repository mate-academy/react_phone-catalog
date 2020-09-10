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
  LIKE: 'LIKE',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  DECREASE_AMOUNT: 'DECREASE_AMOUNT',
  INCREASE_AMOUNT: 'INCREASE_AMOUNT',
  SEARCH: 'SEARCH',
};

export const startLoading = () => ({ type: actions.START_LOADING });
export const setPhones = (phones: Phones[]) => ({ type: actions.SET_PHONES, phones });
export const setPhone = (phone: Phone) => ({ type: actions.SET_PHONE, phone });
export const hasError = () => ({ type: actions.HAS_ERROR });
export const like = (phoneId: string) => ({ type: actions.LIKE, phoneId });
export const addToCart = (phoneId: string) => ({ type: actions.ADD_TO_CART, phoneId });
export const removeFromCart = (phoneId: string) => ({ type: actions.REMOVE_FROM_CART, phoneId });
export const decreaseAmount = (phoneId: string) => ({ type: actions.DECREASE_AMOUNT, phoneId });
export const increaseAmount = (phoneId: string) => ({ type: actions.INCREASE_AMOUNT, phoneId });
export const search = (phones: Phones[]) => ({ type: actions.SEARCH, phones });

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
export const getCart = (state: RootState) => state.cart;

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
  cart: any;
  favs: any;
  reserved: Phones[];
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
  reserved: [],
};

const reducer = (state = inititalState, action: AnyAction) => {
  switch (action.type) {
    case actions.START_LOADING:
      return { ...state, loading: true };

    case actions.SET_PHONES:
      return {
        ...state, loading: false, phones: action.phones, reserved: action.phones,
      };

    case actions.SET_PHONE:
      return { ...state, loading: false, phone: action.phone };

    case actions.HAS_ERROR:
      return { ...state, loading: false, error: true };

    case actions.LIKE:
      return addFav(state, action.phoneId);

    case actions.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, {
          id: action.phoneId,
          quantity: 1,
        }],
      };

    case actions.REMOVE_FROM_CART:
      return { ...state, cart: [...state.cart].filter(item => item.id !== action.phoneId) };

    case actions.DECREASE_AMOUNT:
      return {
        ...state,
        cart: [
          ...state.cart.map((item: { id: string; quantity: number }) => (
            item.id === action.phoneId && item.quantity > 1
              ? {
                id: item.id,
                quantity: item.quantity - 1,
              }
              : item
          )),
        ],
      };

    case actions.INCREASE_AMOUNT:
      return {
        ...state,
        cart: [
          ...state.cart.map((item: { id: string; quantity: number }) => (
            item.id === action.phoneId
              ? {
                id: item.id,
                quantity: item.quantity + 1,
              }
              : item
          )),
        ],
      };

    case actions.SEARCH:
      return {
        ...state,
        phones: action.phones,
      };

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
