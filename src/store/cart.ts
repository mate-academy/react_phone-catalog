import { Action } from 'redux';

const ADD_CART_GOOD = 'ADD_CART_GOOD';
const DELETE_CART_GOOD = 'DELETE_CART_GOOD';
const CLEAR_CART = 'CLEAR_CART';

type setToCart = Action<typeof ADD_CART_GOOD> & {
  good: Good;
  quantity: number;
};

type deleteFromCart = Action<typeof DELETE_CART_GOOD> & {
  good: Good;
};

type clearCart = Action<typeof CLEAR_CART>;

export const setToCart = (good: Good, quantity = 1) => ({
  type: ADD_CART_GOOD,
  good,
  quantity,
});

export const deleteFromCart = (good: Good) => ({
  type: DELETE_CART_GOOD,
  good,
});

export const clearCart = () => ({ type: CLEAR_CART });

type AllowedActions = setToCart | deleteFromCart | clearCart;

let initState: CartGood[] = [];

if (localStorage.getItem('cart')) {
  initState = [...JSON.parse(localStorage.getItem('cart') || '')];
}

const cartReducer = (cart = initState, action: AllowedActions) => {
  switch (action.type) {
    case ADD_CART_GOOD:
      return [
        ...cart,
        {
          good: action.good,
          quantity: action.quantity,
        },
      ];

    case DELETE_CART_GOOD:
      return cart.filter(item => item.good.id !== action.good.id);

    case CLEAR_CART:
      return [];

    default:
      return cart;
  }
};

export default cartReducer;
