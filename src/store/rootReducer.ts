import { AnyAction } from 'redux';
import { State, PhoneInterface } from '../constants/types';
import { ActionTypes } from './actionTypes';

export const initialState: State = {
  phones: [],
  isLoading: false,
  favourites: [],
  cart: [],
  query: '',
};

// selectors
export const getPhones = (state: State) => state.phones;
export const getIsLoading = (state: State) => state.isLoading;
export const getQuery = (state: State) => state.query;

export const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SET_PHONES:
      return {
        ...state,
        phones: action.payload,
      };

    case ActionTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case ActionTypes.ADD_FAVOURITES: {
      // eslint-disable-next-line max-len
      const favourite = [...state.phones].find((phone: PhoneInterface) => phone.id === action.payload) as PhoneInterface;

      if (state.favourites.includes(favourite)) {
        return state;
      }

      return {
        ...state,
        favourites: [...state.favourites, favourite],
      };
    }

    case ActionTypes.ADD_TO_CART: {
      // eslint-disable-next-line max-len
      const cartPhone = [...state.phones].find((phone: PhoneInterface) => phone.id === action.payload) as PhoneInterface;

      if (state.cart.includes(cartPhone)) {
        return state;
      }

      return {
        ...state,
        cart: [...state.cart, cartPhone],
      };
    }

    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case ActionTypes.SET_SORT_BY: {
      const tempPhones = [...state.phones];

      switch (action.payload) {
        case 'age': {
          tempPhones.sort((a, b) => a.age - b.age);

          return {
            ...state,
            phones: tempPhones,
          };
        }

        case 'name': {
          tempPhones.sort((a, b) => a.name.localeCompare(b.name));

          return {
            ...state,
            phones: tempPhones,
          };
        }

        default: {
          return state;
        }
      }
    }

    default:
      return state;
  }
};
