import { BaseProduct } from '@shared/types/APIReturnTypes';

export type CartItem = {
  item: BaseProduct['id'];
  amount: number;
};

export type State = {
  favorites: BaseProduct['id'][];
  cart: CartItem[];
};

export const initialState: State = {
  favorites: [],
  cart: [],
};

type Action =
  | { type: 'ADD_TO_FAV'; payload: BaseProduct['id'] }
  | { type: 'REMOVE_FROM_FAV'; payload: BaseProduct['id'] }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: CartItem };

export function storeReducer(state: State, action: Action) {
  switch (action.type) {
    case 'ADD_TO_FAV':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FROM_FAV':
      return {
        ...state,
        favorites: [...state.favorites].filter(el => el !== action.payload),
      };
    case 'ADD_TO_CART':
      const existingItemIndex = state.cart.findIndex(
        el => el.item === action.payload.item,
      );

      if (existingItemIndex >= 0) {
        return {
          ...state,
          cart: state.cart.map((el, index) =>
            index === existingItemIndex
              ? { ...el, amount: el.amount + action.payload.amount }
              : el,
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart
          .map((el: CartItem) =>
            el.item === action.payload.item
              ? { ...el, amount: el.amount - action.payload.amount }
              : el,
          )
          .filter(el => el.amount > 0),
      };
  }
}
