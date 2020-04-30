import {
  SET_PHONE_DETAILS,
  SET_PHONES,
  TOGGLE_IS_FETCHING,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUBSTRACT_QUANTITY,
} from './constants';

export const setPhoneDetailsAC = (details) => ({
  type: SET_PHONE_DETAILS, details,
});

export const setPhonesAC = (phones) => ({
  type: SET_PHONES, phones,
});

export const toggleIsFetchingAC = (isFetching) => ({
  type: TOGGLE_IS_FETCHING, isFetching,
});

export const addToCartAC = (id) => ({
  type: ADD_TO_CART,
  id,
});

export const removeFromCartAC = (id) => ({
  type: REMOVE_FROM_CART,
  id,
});

export const addQantityAC = (id) => ({
  type: ADD_QUANTITY,
  id,
});

export const substractQuantityAC = (id) => ({
  type: SUBSTRACT_QUANTITY,
  id,
});
