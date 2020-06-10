import { AnyAction } from 'redux';

const SET_TO_CART = 'SET_TO_CART';

export const setToCart = (item: Products, quantity = 1) => ({ type: SET_TO_CART, item, quantity });


type State = {
  items: CartProduct[];
  discount: number;
};

const initState: State = {
  items: [],
  discount: 0,
};
const reducer = (cart = initState, action: AnyAction) => {
  switch (action.type) {
    case SET_TO_CART:
      if (cart.items.every((item: CartProduct) => item.product.id !== action.item.id)) {
        return {
          ...cart,
          items: [...cart.items, {
            product: action.item,
            quantity: action.quantity,
          }],
        };
      }

      return {
        ...cart,
        items: cart.items.filter((item: CartProduct) => item.product.id !== action.item.id),
      };


    default:
      return cart;
  }
};

export default reducer;
