import { Product } from '../types/Product';

type FavoriteAction =
  | {
      type: 'add';
      product: Product;
    }
  | {
      type: 'remove';
      itemId: string;
    };

type FavoriteState = {
  favorites: Product[];
};

export function favoritesReducer(
  state: FavoriteState,
  action: FavoriteAction,
): FavoriteState {
  switch (action.type) {
    case 'add': {
      return {
        ...state,
        favorites: [...state.favorites, action.product],
      };
    }

    case 'remove':
      return {
        ...state,
        favorites: state.favorites.filter(
          item => item.itemId !== action.itemId,
        ),
      };

    default:
      return state;
  }
}
