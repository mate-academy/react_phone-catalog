import { Action } from 'redux';

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const SET_CART_QUANTITY = 'SET_CART_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';

export const setCart = (product: Product, quantity = 1) => (
  {
    type: ADD_TO_CART,
    product,
    quantity,
  }
);
export const removeFromCart = (product: Product) => (
  {
    type: REMOVE_FROM_CART,
    product,
  }
);
export const setQuantity = (product: Product, quantity: number) => (
  {
    type: SET_CART_QUANTITY,
    product,
    quantity,
  }
);
export const clearCart = () => ({ type: CLEAR_CART });

type setCart = Action<typeof ADD_TO_CART> & {
  product: Product;
  quantity: number;
};

type removeFromCart = Action<typeof REMOVE_FROM_CART> & {
  product: Product;
};

type setQuantity = Action<typeof SET_CART_QUANTITY> & {
  product: Product;
  quantity: number;
};
type clearCart = Action<typeof CLEAR_CART>;

type AllowedActions = setCart | removeFromCart
| setQuantity | clearCart;

let initState: CartProduct[] = [];

if (localStorage.getItem('cart')) {
  initState = [...JSON.parse(localStorage.getItem('cart') || '')];
}

const reducer = (cart = initState, action: AllowedActions) => {
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
    case CLEAR_CART:
      return [];

    default:
      return cart;
  }
};

export default reducer;
