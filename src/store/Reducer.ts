import { Reducer, Action } from 'redux';

import {
  LOAD_PHONES,
  LOAD_PHONE,
  SET_FAVOURITE_ID,
  DELETE_FAVOURITE_ID,
  DELETE_CART_ID,
  SET_CART_ID,
  SET_PRICE,
  SET_QUANTITY,
  SET_ERROR,
  SET_SORT,
} from '../utils/constants';

const initialState: State = {
  phones: [],
  phoneDetails: null,
  phoneError: false,
  phonesFavourite: [],
  phonesCart: {},
  sortBy: 'Name',
  totalPrice: 0,
  totalQuantity: 0,
};

interface CustomAction extends Action {
  type: string;
  payload: any;
}

export const phonesReducer: Reducer<State, CustomAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case LOAD_PHONES:
      return {
        ...state,
        phones: action.payload,
      };

    case LOAD_PHONE:
      return {
        ...state,
        phoneDetails: action.payload,
      };

    case SET_FAVOURITE_ID:
      return {
        ...state,
        phonesFavourite: [...state.phonesFavourite, action.payload],
      };

    case DELETE_FAVOURITE_ID:
      return {
        ...state,
        phonesFavourite: [...state.phonesFavourite]
          .filter(id => id !== action.payload),
      };

    case SET_CART_ID:
      return {
        ...state,
        phonesCart: {
          ...state.phonesCart,
          [action.payload.id]: action.payload.quantity,
        },
      };

    case DELETE_CART_ID:
      return {
        ...state,
        phonesCart: { ...action.payload },
      };

    case SET_PRICE:
      return {
        ...state,
        totalPrice: state.totalPrice + action.payload,
      };

    case SET_QUANTITY:
      return {
        ...state,
        totalQuantity: state.totalQuantity + action.payload,
      };

    case SET_ERROR:
      return {
        ...state,
        phoneError: action.payload,
      };

    case SET_SORT:
      return {
        ...state,
        sortBy: action.payload.target.value,
      };

    default:
      return state;
  }
};
