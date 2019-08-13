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

export const addToBasket = phoneName => ({
  type: ADD_TO_BASKET,
  phoneName,
});

export const increaseBasketItem = phoneName => ({
  type: BASKET_ITEM_INCREASED,
  phoneName,
});

export const decreaseBasketItem = phoneName => ({
  type: BASKET_ITEM_DECREASED,
  phoneName,
});

export const removeBasketItem = phoneName => ({
  type: BASKET_ITEM_REMOVED,
  phoneName,
});

export const filterBy = value => ({
  type: FILTER_PHONES,
  value,
});

export const sortBy = value => ({
  type: SORT_BY,
  value,
});
