import { Action } from '../types/Action';
import { State } from '../types/State';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_FAV':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FAV':
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.id !== action.payload),
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(ch => ch.id !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };

    case 'UPDATE_CART_QUANTITY':
      const { id, delta } = action.payload;

      return {
        ...state,
        cart: state.cart
          .map(item => {
            if (item.id === id) {
              const newQuantity = item.quantity + delta;

              return { ...item, quantity: newQuantity };
            }

            return item;
          })
          .filter(item => item.quantity > 0),
      };
    default:
      return state;
  }
}
