import { Dispatch } from 'redux';
import { ActionTypes } from './actionTypes';
import {
  PhoneInterface,
  PhoneDetailsInterface,
  CartInterface,
} from '../constants/types';
import { getDataById, getDetails, getPhones } from '../utils/api';

export const setPhones = (value: PhoneInterface[]) => ({
  type: ActionTypes.SET_PHONES,
  payload: value,
});

export const setDetails = (value: PhoneDetailsInterface) => ({
  type: ActionTypes.SET_DETAILS,
  payload: value,
});

export const setIsLoadingPhones = (value: boolean) => ({
  type: ActionTypes.SET_LOADING_PHONES,
  payload: value,
});

export const setIsLoadingDetails = (value: boolean) => ({
  type: ActionTypes.SET_LOADING_DETAILS,
  payload: value,
});

export const setSortBy = (value: string) => ({
  type: ActionTypes.SET_SORT_BY,
  payload: value,
});

export const setFavourites = (value: string) => ({
  type: ActionTypes.ADD_FAVOURITES,
  payload: value,
});

export const setCart = (value: CartInterface) => ({
  type: ActionTypes.ADD_TO_CART,
  payload: value,
});

export const deleteCart = (value: string) => ({
  type: ActionTypes.DELETE_CART,
  payload: value,
});

export const decreaseCart = (value: string) => ({
  type: ActionTypes.DECREASE_CART,
  payload: value,
});

export const increaseCart = (value: string) => ({
  type: ActionTypes.INCREASE_CART,
  payload: value,
});

export const setQuery = (value: string) => ({
  type: ActionTypes.SET_QUERY,
  payload: value,
});

export const setPagination = (value: number) => ({
  type: ActionTypes.SET_PAGINATION,
  payload: value,
});

export const setCartTrigger = (value: boolean) => ({
  type: ActionTypes.SET_CART_TRIGGER,
  payload: value,
});

// thunk
export const loadPhones = () => {
  return async(dispatch: Dispatch) => {
    try {
      dispatch(setIsLoadingPhones(true));
      const phonesQuery = await getPhones();

      dispatch(setPhones(phonesQuery));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      dispatch(setIsLoadingPhones(false));
      dispatch(setQuery(''));
    }
  };
};

export const loadDetails = (phoneId: string) => {
  return async(dispatch: Dispatch) => {
    try {
      dispatch(setIsLoadingDetails(true));

      const url = getDataById(phoneId);
      const phoneDetails = await getDetails(url);

      dispatch(setDetails(phoneDetails));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      dispatch(setIsLoadingDetails(false));
    }
  };
};
