import { AnyAction } from 'redux';

const SET_FAVORITES = 'SET_FAVORITES';

export const setFavourites = (item: Products) => ({ type: SET_FAVORITES, item });

const reducer = (favourites: Products[] = [], action: AnyAction) => {
  switch (action.type) {
    case SET_FAVORITES:
      if (favourites.every((item: Products) => item.id !== action.item.id)) {
        return [...favourites, action.item];
      }

      return favourites.filter((item: Products) => item.id !== action.item.id);

    default:
      return favourites;
  }
};

export default reducer;
