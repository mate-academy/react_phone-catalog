import { Action } from 'redux';

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const SET_CART_QUANTITY = 'SET_CART_QUANTITY';

type setToCart = Action<typeof ADD_TO_CART> & {
  product: ProductItem;
  quantity: number;
};

type removeFromCart = Action<typeof REMOVE_FROM_CART> & {
  product: ProductItem;
};

type setCartQuantity = Action<typeof SET_CART_QUANTITY> & {
  product: ProductItem;
  quantity: number;
};

export const setToCart = (product: ProductItem, quantity = 1) => (
  {
    type: ADD_TO_CART,
    product,
    quantity,
  }
);

export const removeFromCart = (product: ProductItem) => (
  {
    type: REMOVE_FROM_CART,
    product,
  }
);

export const setCartQuantity = (product: ProductItem, quantity: number) => (
  {
    type: SET_CART_QUANTITY,
    product,
    quantity,
  }
);

type AllowedAction = setToCart | removeFromCart | setCartQuantity;

let initState: CartItem[] = [];

if (localStorage.getItem('cart')) {
  initState = [...JSON.parse(localStorage.getItem('cart') || '')];
}

const cartReducer = (cart = initState, action: AllowedAction) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [
        ...cart,
        {
          product: action.product,
          quantity: action.quantity,
        },
      ];

    case REMOVE_FROM_CART:
      return cart.filter(item => item.product.id !== action.product.id);

    case SET_CART_QUANTITY:
      return cart.map(item => (
        item.product.id === action.product.id
          ? {
            product: action.product,
            quantity: action.quantity,
          }
          : item
      ));

    default:
      return cart;
  }
};

export default cartReducer;
