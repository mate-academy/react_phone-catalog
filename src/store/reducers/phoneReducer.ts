import { AnyAction } from 'redux';
import { ActionTypes } from '../actionTypes';
import { PhoneState } from '../../constants/types';

export const phoneState: PhoneState = {
  phones: [],
  details: null,
  query: '',
  paginationPage: 16,
};

export const getPhones = (state: PhoneState) => state.phones;
export const getDetails = (state: PhoneState) => state.details;
export const getQuery = (state: PhoneState) => state.query;
export const getPagination = (state: PhoneState) => state.paginationPage;

export const phoneReducer = (state = phoneState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SET_PHONES:
      return {
        ...state,
        phones: action.payload,
      };

    case ActionTypes.SET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case ActionTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case ActionTypes.SET_PAGINATION:
      return {
        ...state,
        paginationPage: action.payload,
      };

    case ActionTypes.SET_SORT_BY: {
      const tempPhones = [...state.phones];

      switch (action.payload) {
        case 'year': {
          tempPhones.sort((a, b) => +a.year - +b.year);

          return {
            ...state,
            phones: tempPhones,
          };
        }

        case 'price': {
          tempPhones.sort((a, b) => a.priceDiscount - b.priceDiscount);

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
