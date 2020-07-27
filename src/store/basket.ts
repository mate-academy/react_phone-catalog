import { AnyAction } from 'redux';
import { Product, Basket } from '../interfaces';

import { removeDuplicates, deleteItemFromBasket } from '../helpers/removeDuplicates';

const SET_BASKET = 'SET_BASKET';
const REMOVE__ITEM = 'REMOVE__ITEM';
const DELETE__ITEM = 'DELETE__ITEM';

export const setBasket = (basketItem: Product) => ({ type: SET_BASKET, payload: basketItem });
export const removeItem = (basketItem: Product) => ({ type: REMOVE__ITEM, payload: basketItem });
export const deleteItem = (id: string) => ({ type: DELETE__ITEM, payload: id });

let initState: Basket[] = [];

if (localStorage.getItem('cart')) {
  initState = [...JSON.parse(localStorage.getItem('cart') || '')];
}

const reducer = (basketItems: Basket[] = initState, action: AnyAction) => {
  switch (action.type) {
    case SET_BASKET:
      return [
        ...removeDuplicates(basketItems, action.payload, 'add'),
      ];
    case REMOVE__ITEM:
      return [
        ...removeDuplicates(basketItems, action.payload, 'remove'),
      ];
    case DELETE__ITEM:
      return deleteItemFromBasket(basketItems, action.payload);

    default:
      return basketItems;
  }
};

export default reducer;
