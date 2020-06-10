import { AnyAction } from 'redux';
import { createSelector } from 'reselect';
import { RootState } from './index';

const SET_TO_CART = 'SET_TO_CART';
const SET_CART_QUANTITY = 'SET_CART_QUANTITY';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const setToCart = (product: Products, quantity = 1) => (
  { type: SET_TO_CART, product, quantity });
export const setQuantity = (product: Products, quantity: number) => (
  { type: SET_CART_QUANTITY, product, quantity });
export const removeFromCart = (product: Products) => ({ type: REMOVE_FROM_CART, product });

type State = {
  items: CartProduct[];
  discount: number;
};

const initState: State = {
  items: [],
  discount: 0,
};


export const getItems = (state: RootState) => state.cart.items;

export const getTotalPrice = createSelector(
  getItems,

  (items: CartProduct[]) => {
    return items
      .reduce((sum, { quantity, product }) => sum + quantity * product.price - product.discount, 0);
  },
);

export const getDiscount = createSelector(
  getItems,

  (items: CartProduct[]) => {
    return items
      .reduce((sum, { quantity, product }) => sum + quantity * product.discount, 0);
  },
);

const reducer = (cart = initState, action: AnyAction) => {
  switch (action.type) {
    case SET_TO_CART:

      if (cart.items.every((item: CartProduct) => item.product.id !== action.product.id)) {
        return {
          ...cart,
          items: [...cart.items, {
            product: action.product,
            quantity: action.quantity,
          }],
        };
      }

      return {
        ...cart,
        items: cart.items.filter((item: CartProduct) => item.product.id !== action.product.id),
      };
    case SET_CART_QUANTITY: {
      const { product } = action;

      return {
        ...cart,
        items: cart.items.map(item => {
          if (item.product.id !== product.id) {
            return item;
          }

          return {
            product,
            quantity: action.quantity < 1 ? 1 : action.quantity,
          };
        }),
      };
    }

    case REMOVE_FROM_CART: {
      const product = action.product as Products;

      return {
        ...cart,
        items: cart.items.filter(item => item.product.id !== product.id),
      };
    }


    default:
      return cart;
  }
};


export default reducer;
