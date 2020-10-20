const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const actionCreators = {
  addToCart: (item) => ({
    type: ADD_TO_CART,
    cartItem: item,
  }),

  removeFromCart: (item) => ({
    type: REMOVE_FROM_CART,
    cartItem: item,
  }),
};

const cartInitialState = {
  items: [],
};

const cartReducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.cartItem],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: [...state.items.filter(item => item !== action.cartItem)],
      };

    default:
      return state;
  }
};

export default cartReducer;
