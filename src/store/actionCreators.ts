import { ActionTypes } from './actionTypes';
import { PhoneInterface } from '../constants/types';

export const setPhones = (value: PhoneInterface[]) => ({
  type: ActionTypes.SET_PHONES,
  payload: value,
});

export const setIsLoading = (value: boolean) => ({
  type: ActionTypes.SET_LOADING,
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

export const setCart = (value: string) => ({
  type: ActionTypes.ADD_TO_CART,
  payload: value,
});

export const setQuery = (value: string) => ({
  type: ActionTypes.SET_QUERY,
  payload: value,
});
