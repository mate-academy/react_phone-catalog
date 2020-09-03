import { Action } from 'redux';

const LOAD_CART_ITEM = 'LOAD_CART_ITEM';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
const INCREASE_COUNT = 'INCREASE_COUNT';
const DECREASE_COUNT = 'DECREASE_COUNT';
const CLEAR_CART = 'CLEAR_CART';

type LoadCartItem = Action<typeof LOAD_CART_ITEM> & {
  item: Gadget;
  count: number;
};
type DeleteCartItem = Action<typeof DELETE_CART_ITEM> & {
  id: string;
};
type IncreaseCount = Action<typeof INCREASE_COUNT> & {
  id: string;
};
type DecreaseCount = Action<typeof DECREASE_COUNT> & {
  id: string;
};
type ClearCart = Action<typeof CLEAR_CART>

export const loadCart = (item: Gadget, count: number): LoadCartItem => (
  {
    type: LOAD_CART_ITEM,
    item,
    count,
  }
);

export const deleteCart = (id: string): DeleteCartItem => (
  {
    type: DELETE_CART_ITEM,
    id,
  }
);

export const increaseCount = (id: string): IncreaseCount => (
  {
    type: INCREASE_COUNT,
    id,
  }
);

export const decreaseCount = (id: string): DecreaseCount => (
  {
    type: DECREASE_COUNT,
    id,
  }
);

export const clearCart = (): ClearCart => (
  {
    type: CLEAR_CART,
  }
);

export type InitialCartState = {
  cartItem: Gadget[];
};

const initialCartState: InitialCartState = {
  cartItem: [],
};

export type AllAction = LoadCartItem
| DeleteCartItem
| IncreaseCount
| DecreaseCount
| ClearCart;

const cartReducer = (state = initialCartState, action: AllAction) => {
  switch (action.type) {
    case LOAD_CART_ITEM: return {
      cartItem: [...state.cartItem, { ...action.item, count: action.count }],
    };
    case DELETE_CART_ITEM: return {
      cartItem: [...state.cartItem].filter(item => item.id !== action.id),
    };
    case INCREASE_COUNT: return {
      cartItem: [...state.cartItem].map(item => (
        (item.id !== action.id)
          ? item
          : {
            ...item,
            count: (item.count || 0) + 1,
          }
      )),
    };
    case DECREASE_COUNT: return {
      cartItem: [...state.cartItem].map(item => (
        (item.id !== action.id)
          ? item
          : {
            ...item,
            count: (item.count || 0) - 1,
          }
      )),
    };
    case CLEAR_CART: return {
      cartItem: [],
    };

    default: return state;
  }
};

export default cartReducer;
