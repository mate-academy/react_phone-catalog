import { ThunkDispatch } from 'redux-thunk';
import { PHONES_URL } from '../api/constants';

export const type = {
  SET_PHONES: 'SET_PHONES',
  SET_BASKET: 'SET_BASKET',
  SET_IS_OPENED_BASKET: 'SET_IS_OPENED_BASKET',
};

export const setPhones = (phones: Phone[]) => ({
  type: type.SET_PHONES,
  phones,
});

export const setBasket = (basket: Basket[]) => ({
  type: type.SET_BASKET,
  basket,
});

export const setisOpenedBasket = () => ({
  type: type.SET_IS_OPENED_BASKET,
});

export const loadPhones = () => {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    fetch(PHONES_URL)
      .then(async data => dispatch(setPhones(await data.json())));
  };
};
