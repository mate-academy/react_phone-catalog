import { Dispatch } from 'redux';

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
  SET_ERROR,
  SET_SORT,
} from '../utils/constants';

import { getPhones, getDetails, getPhone } from '../api/api';

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

export const setCartId = (payload: PhoneCartInfo) => ({
  type: SET_CART_ID,
  payload,
});

export const deleteCartId = (payload: Cart) => ({
  type: DELETE_CART_ID,
  payload,
});

export const setError = (payload: boolean) => ({
  type: SET_ERROR,
  payload,
});

export const setSortBy = (payload: React.ChangeEvent<HTMLSelectElement>) => ({
  type: SET_SORT,
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
