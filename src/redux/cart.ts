import { Action } from 'redux';

const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FAVORITE';
const ADD_QUANTITY = 'ADD_QUANTITY';
const SUBTRACT_QUANTITY = 'SUBTRACT_QUANTITY';

export const addToCart = (product: Product | undefined, price: number) => (
  { type: ADD_TO_CART, product, price }
);
export const deleteFromCart = (id: string, price: number) => (
  { type: DELETE_FROM_CART, id, price }
);
export const addQuantity = (price: number) => ({ type: ADD_QUANTITY, price });
export const subtractQuantity = (price: number) => ({ type: SUBTRACT_QUANTITY, price });

type addToCartAction = Action<typeof ADD_TO_CART> & {
  product: Product;
  price: number;
};

type deleteFromCartAction = Action<typeof DELETE_FROM_CART> & {
  id: string;
  price: number;
};

type addQuantityAction = Action<typeof ADD_QUANTITY> & {
  price: number;
};

type subtractQuantityAction = Action<typeof SUBTRACT_QUANTITY> & {
  price: number;
};

type PossibleAction = addToCartAction | deleteFromCartAction
  | addQuantityAction | subtractQuantityAction;

type stateType = {
  cartItems: Product[];
  price: number;
  quantity: number;
};

const initialState: stateType = {
  cartItems: [],
  price: 0,
  quantity: 1,
};

const cartItemsReducer = (state = initialState, action: PossibleAction) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.product],
        price: state.price + action.price,
      };

    case DELETE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(product => product.id !== action.id),
        price: state.price - action.price,
      };

    case ADD_QUANTITY:
      return {
        ...state,
        quantity: state.quantity + 1,
        price: state.price + action.price,
      };

    case SUBTRACT_QUANTITY:
      return {
        ...state,
        quantity: state.quantity - 1,
        price: state.price - action.price,
      };

    default:
      return state;
  }
};

export default cartItemsReducer;
