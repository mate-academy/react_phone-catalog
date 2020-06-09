import { Action } from 'redux';

const SET_FAVORITE = 'SET_FAVORITES';
const DELETE_FAVORITE = 'DELETE_FAVORITE';

export const setFavorite = (product: Product | undefined) => ({ type: SET_FAVORITE, product });
export const deleteFavorite = (id: string) => ({ type: DELETE_FAVORITE, id });

type setFavoriteAction = Action<typeof SET_FAVORITE> & {
  product: Product;
};
type deleteFavoriteAction = Action<typeof DELETE_FAVORITE> & {
  id: keyof Product;
};
type AllowedActions = setFavoriteAction | deleteFavoriteAction;

const favoritesReducer = (favorites: Product[] = [], action: AllowedActions) => {
  switch (action.type) {
    case SET_FAVORITE:
      return [...favorites, action.product];

    case DELETE_FAVORITE:
      return favorites.filter(product => product.id !== action.id);

    default:
      return favorites;
  }
};

export default favoritesReducer;
