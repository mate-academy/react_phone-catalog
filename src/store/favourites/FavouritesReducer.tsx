import { Product } from '../../types/types';

const TOGGLE_ITEM = 'TOGGLE_ITEM';

type ToggleItem = {
  type: typeof TOGGLE_ITEM;
  product: Product;
};

export type FavouritesAction = ToggleItem;

export const favouritesReducer = (
  state: Product[],
  action: FavouritesAction,
) => {
  switch (action.type) {
    case TOGGLE_ITEM:
      if (state.some(item => item.id === action.product.id)) {
        return state.filter(item => item.id !== action.product.id);
      }

      return [...state, action.product];

    default:
      return state;
  }
};

export const toggleFavourites = (product: Product): ToggleItem => ({
  type: TOGGLE_ITEM,
  product,
});
