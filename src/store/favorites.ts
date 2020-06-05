
import { Product } from '../interfaces';
import { AnyAction } from 'redux';

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_ONE_FROM_FAVORITES = 'REMOVE_ONE_FROM_FAVORITES';

export const addToFavorites = (product: Product) => ({
  type: ADD_TO_FAVORITES,
  product
})

export const removeOneFromFavorites = (product: Product) => ({
  type: REMOVE_ONE_FROM_FAVORITES,
  product
})

export const favoritesReducer = (state:Product[] = [], action: AnyAction) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return ([
        ...state,
        action.product,
      ]);
    case REMOVE_ONE_FROM_FAVORITES:
      return (
        state.filter((item: Product) => item.id !== action.product.id)
      );
    default:
      return state;
  }
}
