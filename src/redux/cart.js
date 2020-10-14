const ADD_TO_CART = 'ADD_TO_CART';

export const actionCreators = {
  addToCart: (item) => ({
    type: ADD_TO_CART,
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

    default:
      return state;
  }
};

export default cartReducer;
