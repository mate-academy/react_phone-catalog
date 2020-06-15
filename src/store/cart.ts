import { AnyAction } from 'redux';
import { createSelector } from 'reselect';

const SET_TO_CART = 'SET_TO_CART';
const SET_CART_QUANTITY = 'SET_CART_QUANTITY';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const setToCart = (product: Products, quantity = 1) => (
  { type: SET_TO_CART, product, quantity });
export const setQuantity = (product: Products, quantity: number) => (
  { type: SET_CART_QUANTITY, product, quantity });
export const removeFromCart = (product: Products) => ({ type: REMOVE_FROM_CART, product });


type CartState = {
  items: CartProduct[];
};

const initState: CartState = {
  items: [],
};


export const getCartItems = (state: {cart: CartState}) => state.cart.items;

export const getTotalPrice = createSelector(
  getCartItems,

  (items: CartProduct[]) => {
    return items
      .reduce((sum, { quantity, product }) => sum + quantity * product.price - product.discount, 0);
  },
);

export const getDiscount = createSelector(
  getCartItems,

  (items: CartProduct[]) => {
    return items
      .reduce((sum, { quantity, product }) => sum + quantity * product.discount, 0);
  },
);

const reducer = (cart = initState, action: AnyAction): CartState => {
  switch (action.type) {
    case SET_TO_CART:

      if (cart.items.every((item: CartProduct) => item.product.id !== action.product.id)) {
        const newItem: CartProduct = {
          product: action.product,
          quantity: action.quantity,
        };

        return {
          items: [...cart.items, newItem],
        };
      }

      return {
        items: cart.items.filter((item: CartProduct) => item.product.id !== action.product.id),
      };
    case SET_CART_QUANTITY: {
      const { product } = action;

      return {
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
        items: cart.items.filter(item => item.product.id !== product.id),
      };
    }


    default:
      return cart;
  }
};


export default reducer;
