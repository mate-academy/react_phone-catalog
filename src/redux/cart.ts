import { Action } from 'redux';

const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FAVORITE';
const SET_PRICE = 'SET_PRICE';

export const addToCart = (product: Product | undefined) => ({ type: ADD_TO_CART, product });
export const deleteFromCart = (id: string) => ({ type: DELETE_FROM_CART, id });
export const setPrice = (id: string) => ({ type: SET_PRICE, id });

type addToCartAction = Action<typeof ADD_TO_CART> & {
  product: Product;
};
type deleteFromCartAction = Action<typeof DELETE_FROM_CART> & {
  id: keyof Product;
};

type setPriceAction = Action<typeof SET_PRICE> & {
  id: keyof Product;
};
type PossibleAction = addToCartAction | deleteFromCartAction | setPriceAction;

type stateType = {
  cart: Product[];
  price: number;
};

const initialState: stateType = {
  cart: [],
  price: 0,
};

const cartReducer = (state = initialState, action: PossibleAction) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.product],
      };

    case DELETE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.id),
      };

    case SET_PRICE:
      return {
        ...state,
        price: 0
      };

    default:
      return state;
  }
};

export default cartReducer;
