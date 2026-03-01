import { Action, State } from '../types/reducerTypes';
import { getInitialState } from '../utils/storage';

export const initialState = getInitialState();

export const appReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'TOOGLE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light';

      try {
        localStorage.setItem('theme', newTheme);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('There was a problem with saving theme', e);
      }

      return { ...state, theme: newTheme };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'CHANGE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: action.payload.quantity,
            };
          }

          return item;
        }),
      };
    case 'RESET_CART':
      return { ...state, cart: [] };
    case 'ADD_TO_FAVOURITES':
      return { ...state, favourites: [...state.favourites, action.payload] };
    case 'REMOVE_FROM_FAVOURITES':
      return {
        ...state,
        favourites: state.favourites.filter(
          item => item.itemId !== action.payload,
        ),
      };
    default:
      return state;
  }
};
