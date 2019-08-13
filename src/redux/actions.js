export const PHONES_RECEIVED = 'PHONES_RECEIVED';
export const ADD_TO_BASKET = 'ADD_TO_BASKET';
export const BASKET_ITEM_INCREASED = 'BASKET_ITEM_INCREASED';
export const BASKET_ITEM_DECREASED = 'BASKET_ITEM_DECREASED';
export const BASKET_ITEM_REMOVED = 'BASKET_ITEM_REMOVED';
export const FILTER_PHONES = 'FILTER_PHONES';
export const SORT_BY = 'SORT_BY';

export const loadPhones = () => (dispatch) => {
  fetch('https://mate-academy.github.io/phone-catalogue-static/api/phones.json')
    .then(res => res.json())
    .then(phones => (
      dispatch(receivePhones(phones))
    ));
};

export const receivePhones = phones => ({
  type: PHONES_RECEIVED,
  phones,
});

export const addToBasket = phoneId => ({
  type: ADD_TO_BASKET,
  phoneId,
});

export const increaseBasketItem = phoneId => ({
  type: BASKET_ITEM_INCREASED,
  phoneId,
});

export const decreaseBasketItem = phoneId => ({
  type: BASKET_ITEM_DECREASED,
  phoneId,
});

export const removeBasketItem = phoneId => ({
  type: BASKET_ITEM_REMOVED,
  phoneId,
});

export const filterBy = value => ({
  type: FILTER_PHONES,
  value,
});

export const sortBy = value => ({
  type: SORT_BY,
  value,
});
