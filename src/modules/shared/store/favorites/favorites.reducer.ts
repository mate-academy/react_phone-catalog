import { FavoritesAction } from '../actions';
import { FavoritesState } from './favorites.types';

export const favoritesInitialState: FavoritesState = {
  items: [],
};

export function favoritesReducer(
  state: FavoritesState,
  action: FavoritesAction,
): FavoritesState {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const exists = state.items.some(p => p.id === action.payload.id);

      return {
        items: exists
          ? state.items.filter(p => p.id !== action.payload.id)
          : [...state.items, action.payload],
      };
    }

    default:
      return state;
  }
}
