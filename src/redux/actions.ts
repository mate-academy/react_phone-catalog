import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { PHONES_URL, GetDetailsURL } from '../api/constants';

export const type = {
  SET_PHONES: 'SET_PHONES',
  SET_BASKET: 'SET_BASKET',
  SET_LIKES: 'SET_LIKES',
  SET_PHONE_DETAILS: 'SET_PHONE_DETAILS',
  SET_ERROR: 'SET_ERROR',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_IS_LOADED: 'SET_IS_LOADED',
};

export const setIsLoaded = (status: boolean) => ({
  type: type.SET_IS_LOADED,
  isLoaded: status,
});

export const setIsLoading = (status: boolean) => ({
  type: type.SET_IS_LOADING,
  isLoading: status,
});

export const setPhones = (phones: Phone[]) => ({
  type: type.SET_PHONES,
  phones,
});

export const setPhoneDetails = (phone: Details) => ({
  type: type.SET_PHONE_DETAILS,
  phone,
});

export const setBasket = (basket: Basket[]) => ({
  type: type.SET_BASKET,
  basket,
});

export const setLikes = (likes: string[]) => ({
  type: type.SET_LIKES,
  likes,
});

export const setError = (error: string|null) => ({
  type: type.SET_ERROR,
  error,
});

export const loadPhones = () => {
  return (dispatch: ThunkDispatch<CatalogState&LoadState, unknown, Action>) => {
    dispatch(setIsLoading(true));
    dispatch(setIsLoaded(false));
    fetch(PHONES_URL)
      .then(async data => dispatch(setPhones(await data.json())))
      .finally(() => {
        dispatch(setIsLoaded(true));
        dispatch(setIsLoading(false));
      });
  };
};

export const loadPhoneDetails = (id: string) => {
  return (dispatch: ThunkDispatch<
    ErrorState&PhoneDetailsState&LoadState,
    unknown,
    Action
    >) => {
    dispatch(setError(null));
    dispatch(setIsLoaded(false));
    dispatch(setIsLoading(true));
    fetch(GetDetailsURL(id))
      .then(async data => {
        if (data.ok) {
          dispatch(setPhoneDetails(await data.json()));
        } else {
          throw new Error(data.statusText);
        }
      })
      .catch(err => dispatch(setError(err)))
      .finally(() => {
        dispatch(setIsLoaded(true));
        dispatch(setIsLoading(false));
      });
  };
};
