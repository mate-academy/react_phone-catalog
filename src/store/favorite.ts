import { AnyAction } from 'redux';
import { Product } from '../interfaces';
import { addFavorite } from '../helpers/addFavorite';

const SET_FAVORITE = 'SET_FAVORITE';

export const setFavorite = (favorite: Product) => ({ type: SET_FAVORITE, payload: favorite });

let initState: Product[] = [];

if (localStorage.getItem('favorite')) {
  initState = [...JSON.parse(localStorage.getItem('favorite') || '')];
}

const reducer = (favoriteItems: Product[] = initState, action: AnyAction) => {
  switch (action.type) {
    case SET_FAVORITE:
      return addFavorite(favoriteItems, action.payload);

    default:
      return favoriteItems;
  }
};

export default reducer;
