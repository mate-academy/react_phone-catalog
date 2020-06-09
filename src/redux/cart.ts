import { Action } from 'redux';

const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';
const ADD_QUANTITY = 'ADD_QUANTITY';
const SUBTRACT_QUANTITY = 'SUBTRACT_QUANTITY';
const RESET_CART = 'RESET_CART';

export const addToCart = (product: Product | undefined, id: string, price: number) => (
  {
    type: ADD_TO_CART, product, id, price,
  }
);

export const deleteFromCart = (id: string, price: number) => (
  { type: DELETE_FROM_CART, id, price }
);

export const resetCart = () => ({ type: RESET_CART });

export const addQuantity = (id: string, price: number) => (
  { type: ADD_QUANTITY, id, price }
);

export const subtractQuantity = (id: string, price: number) => (
  { type: SUBTRACT_QUANTITY, id, price }
);

type addToCartAction = Action<typeof ADD_TO_CART> & {
  product: Product;
  price: number;
  id: string;
};

type deleteFromCartAction = Action<typeof DELETE_FROM_CART> & {
  id: string;
  price: number;
};

type addQuantityAction = Action<typeof ADD_QUANTITY> & {
  price: number;
  id: string;
};

type subtractQuantityAction = Action<typeof SUBTRACT_QUANTITY> & {
  price: number;
  id: string;
};

type resetCartAction = Action<typeof RESET_CART>;

type AllowedActions = addToCartAction | deleteFromCartAction
| addQuantityAction | subtractQuantityAction | resetCartAction;

type stateType = {
  cartItems: Product[];
  price: number;
};

const initialState: stateType = {
  cartItems: [],
  price: 0,
};

const cartItemsReducer = (state = initialState, action: AllowedActions) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.product]
          .map(item => {
            if (item.id === action.id) {
              return { ...item, quantity: 1 };
            }

            return { ...item, quantity: item.quantity };
          }),
        price: state.price + action.price,
      };

    case DELETE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.id),
        price: state.cartItems.find(
          item => item.id === action.id,
        )!.quantity! > 1
          ? state.price - state.cartItems.find(
            item => item.id === action.id,
          )!.quantity! * action.price
          : state.price - action.price,
      };

    case ADD_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item => ({
          ...item,
          quantity: item.id === action.id
            ? item.quantity! + 1
            : item.quantity,
        })),
        price: state.price + action.price,
      };

    case SUBTRACT_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item => ({
          ...item,
          quantity: item.id === action.id
            ? item.quantity! - 1
            : item.quantity,
        })),
        price: state.price - action.price,
      };

    case RESET_CART:
      return {
        cartItems: [],
        price: 0,
      };

    default:
      return state;
  }
};

export default cartItemsReducer;
