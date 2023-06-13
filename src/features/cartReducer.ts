import { CartItem } from "../types/CartItem";

type LoadCartAction = {
  type: 'cart/LOAD';
  payload: CartItem[];
};

type AddToCartAction = {
  type: 'cart/ADD';
  payload: CartItem;
};

type RemoveToCartAction = {
  type: 'cart/REMOVE';
  payload: string;
};

type IncreaseQuantityCartAction = {
  type: 'cart/INCREASE_QUANTITY';
  payload: string;
};

type DecreaseQuantityCartAction = {
  type: 'cart/DECREASE_QUANTITY';
  payload: string;
};

type State = CartItem[];

type Action = LoadCartAction
  | AddToCartAction
  | RemoveToCartAction
  | IncreaseQuantityCartAction
  | DecreaseQuantityCartAction;

const setCartItems = (items: CartItem[]): LoadCartAction => ({
  type: 'cart/LOAD',
  payload: items,
});

const addItemToCart = (item: CartItem): AddToCartAction => ({
  type: 'cart/ADD',
  payload: item,
});

const removeItemToCart = (itemId: string): RemoveToCartAction => ({
  type: 'cart/REMOVE',
  payload: itemId,
});

const increaseCartItems = (itemId: string): IncreaseQuantityCartAction => ({
  type: 'cart/INCREASE_QUANTITY',
  payload: itemId,
});

const decreaseCartItems = (itemId: string): DecreaseQuantityCartAction => ({
  type: 'cart/DECREASE_QUANTITY',
  payload: itemId,
});

export const cartReducer = (
  cartItems: State = [],
  action: Action,
) => {
  switch (action.type) {
    case 'cart/LOAD':
      return action.payload;

    case 'cart/ADD':
      return [...cartItems, action.payload];

    case 'cart/REMOVE':
      return cartItems.filter(item => item.id !== action.payload);

    case 'cart/INCREASE_QUANTITY':
      return cartItems.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }

        return item;
      });

    case 'cart/DECREASE_QUANTITY':
      return cartItems.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity - 1,
          }
        }

        return item;
      });

    default:
      return cartItems;
  }
}

export const actions = {
  setCartItems,
  addItemToCart,
  removeItemToCart,
  increaseCartItems,
  decreaseCartItems,
};

export default cartReducer;
