import { AnyAction } from 'redux';
import { ActionTypes } from '../actionTypes';
import { FavouritesState } from '../../constants/types';

export const favouriteState: FavouritesState = {
  favourites: [],
};

export const getFavourites = (state: FavouritesState) => state.favourites;

export const favouritesReducer = (
  state = favouriteState, action: AnyAction,
) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVOURITES: {
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };
    }

    default:
      return state;
  }
};
