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
    id: 'apple-iphone-11-pro-max-512gb-spacegray',
    namespaceId: 'apple-iphone-11-pro-max',
    name: 'Apple iPhone 11 Pro Max 512GB Spacegray',
    capacityAvailable: ['64GB', '256GB', '512GB'],
    capacity: '512GB',
    priceRegular: 2020,
    priceDiscount: 1930,
    colorsAvailable: ['spacegray', 'midnightgreen', 'gold', 'silver'],
    color: 'spacegray',
    images: [
      'img/phones/apple-iphone-11-pro-max/spacegray/00.jpg',
      'img/phones/apple-iphone-11-pro-max/spacegray/01.jpg',
      'img/phones/apple-iphone-11-pro-max/spacegray/02.jpg',
    ],
    description: [
      {
        title: 'And then there was Pro',
        text: [
          'A transformative triple-camera system that adds tons of capability without complexity.',
          'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
        ],
      },
      {
        title: 'Camera',
        text: [
          'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
        ],
      },
      {
        title: 'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
        text: [
          'iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
        ],
      },
    ],
    screen: "6.5' OLED",
    resolution: '2688х1242',
    processor: 'Apple A13 Bionic',
    ram: '4GB',
    camera: '12 Mp + 12 Mp + 12MP',
    zoom: 'Digital, 10x / Optical, 2x',
    cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE'],
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
