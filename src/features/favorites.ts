import { Product } from '../types/Product';

type AddAction = { type: 'favorites/ADD'; payload: Product };
type TakeAction = { type: 'favorites/TAKE'; payload: Product };
type ClearAction = { type: 'favorites/CLEAR' };

type Action = AddAction | TakeAction | ClearAction;
export type FavoritesItem = Product;

const add = (
  value: Product,
): AddAction => ({ type: 'favorites/ADD', payload: value });
const take = (
  value: Product,
): TakeAction => ({ type: 'favorites/TAKE', payload: value });
const clear = (
): ClearAction => ({ type: 'favorites/CLEAR' });

const favoritesReducer = (
  favorites: FavoritesItem[] = [],
  action: Action,
): FavoritesItem[] => {
  switch (action.type) {
    case 'favorites/ADD': {
      return [...favorites, action.payload];
    }

    case 'favorites/TAKE': {
      return favorites.filter(
        favoritesItem => favoritesItem.itemId !== action.payload.itemId,
      );
    }

    case 'favorites/CLEAR': {
      return [];
    }

    default: {
      return favorites;
    }
  }
};

export const actions = { add, take, clear };
export default favoritesReducer;
