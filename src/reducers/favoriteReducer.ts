import { FavoritesAction } from '../enums/enums';
import { getFromLocalStorage, saveToLocalStorage } from '../helpers/helpers';
import { Product } from '../types/Product';

export type FavoritesActionType =
  | { type: FavoritesAction.ADD; payload: Product }
  | { type: FavoritesAction.LOAD }
  | { type: FavoritesAction.REMOVE; payload: string };

export type State = {
  favorites: Product[],
};

export const favoritesReducer = (
  state: State,
  action: FavoritesActionType,
): State => {
  switch (action.type) {
    case FavoritesAction.LOAD: {
      const products = getFromLocalStorage('favorites');

      return { ...state, favorites: products };
    }

    case FavoritesAction.ADD: {
      const updatedFavorites = [...state.favorites, action.payload];

      saveToLocalStorage('favorites', updatedFavorites);

      return { ...state, favorites: updatedFavorites };
    }

    case FavoritesAction.REMOVE: {
      const updatedFavorites = state.favorites
        .filter((favorite) => favorite.id !== action.payload);

      saveToLocalStorage('favorites', updatedFavorites);

      return { ...state, favorites: updatedFavorites };
    }

    default:
      throw new Error('Uknown action');
  }
};
