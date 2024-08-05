import { CartAction, LikedAction } from '../types/Actions';
import { Product } from '../types/Product';

export const CartReducer = (state: Product[], action: CartAction) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];

    case 'deleteProduct':
      return state.filter(
        (product: Product) => product.itemId !== action.payload,
      );

    case 'deleteItem':
      const newState = [...state];
      const lastIndex = state.map(item => item.id).lastIndexOf(action.payload);

      newState.splice(lastIndex, 1);

      return newState;

    case 'clear':
      return [];

    default:
      return state;
  }
};

export const LikedReducer = (state: Product[], action: LikedAction) => {
  switch (action.type) {
    case 'toggle':
      return state.map(item => item.id).includes(action.payload.id)
        ? state.filter(item => item.id !== action.payload.id)
        : [...state, action.payload];

    default:
      return state;
  }
};
