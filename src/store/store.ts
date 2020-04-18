import {
  Reducer,
  createStore,
  applyMiddleware,
  Dispatch,
  Action,
} from 'redux';
import thunk from 'redux-thunk';

import { getPhones, getDetails, getPhone } from '../api/api';

import {
  PHONES_URL,
  LOAD_PHONES,
  LOAD_PHONE,
  SET_FAVOURITE_ID,
  DELETE_FAVOURITE_ID,
  DELETE_CART_ID,
  SET_CART_ID,
  SET_PRICE,
  SET_QUANTITY,
} from '../utils/constants';

const initialState: State = {
  phones: [],
  phoneDetails: null,
  phoneError: false,
  phonesFavourite: [],
  phonesCart: [],
  sortBy: 'Name',
  totalPrice: 0,
  totalQuantity: 0,
};

interface CustomAction extends Action {
  type: string;
  payload: any;
}

export const setPhones = (payload: PhonesWithDetails[]) => ({
  type: LOAD_PHONES,
  payload,
});

export const setPhone = (payload: Details) => ({
  type: LOAD_PHONE,
  payload,
});

export const setFavouriteId = (payload: string) => ({
  type: SET_FAVOURITE_ID,
  payload,
});

export const deleteFavouriteId = (payload: string) => ({
  type: DELETE_FAVOURITE_ID,
  payload,
});

export const setCartId = (payload: string) => ({
  type: SET_CART_ID,
  payload,
});

export const deleteCartId = (payload: string) => ({
  type: DELETE_CART_ID,
  payload,
});

export const setError = (payload: boolean) => ({
  type: 'SET_ERROR',
  payload,
});

export const setSortBy = (payload: React.ChangeEvent<HTMLSelectElement>) => ({
  type: 'SET_SORT',
  payload,
});

export const setPriceToAmount = (payload: number) => ({
  type: SET_PRICE,
  payload,
});

export const setQuantityToTotal = (payload: number) => ({
  type: SET_QUANTITY,
  payload,
});

export const loadPhones = () => {
  return async(dispatch: Dispatch, getState: () => State) => {
    const { phones } = getState();

    if (phones.length) {
      return;
    }

    try {
      const phonesFromApi = await getPhones<Phone[]>(PHONES_URL);
      const details = await getDetails<Details[]>(phonesFromApi);
      const phonesWithDetails = phonesFromApi.map(phone => ({
        ...phone,
        details: details.find(detail => phone.phoneId === detail.id) as Details,
      }));

      dispatch(setError(false));
      dispatch(setPhones(phonesWithDetails));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
    }
  };
};

export const loadPhone = (id: string) => {
  return async(dispatch: Dispatch, getState: () => State) => {
    const { phones } = getState();

    if (phones.length) {
      const phoneDetails = phones.find(phone => id === phone.phoneId);

      if (phoneDetails) {
        dispatch(setPhone(phoneDetails.details));
      }
    } else {
      getPhone<Details>(id)
        .then(data => {
          dispatch(setPhone(data));
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error.message);
          dispatch(setError(true));
        });
    }

    dispatch(setError(false));
  };
};

const phonesReducer: Reducer<State, CustomAction> = (
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
        phonesCart: [...state.phonesCart, action.payload],
      };

    case DELETE_CART_ID:
      return {
        ...state,
        phonesCart: [...state.phonesCart]
          .filter(id => id !== action.payload),
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

    case 'SET_ERROR':
      return {
        ...state,
        phoneError: action.payload,
      };

    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload.target.value,
      };

    default:
      return state;
  }
};

export const store = createStore(
  phonesReducer,
  applyMiddleware(thunk),
);
