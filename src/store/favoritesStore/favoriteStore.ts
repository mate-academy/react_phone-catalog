import { Action } from 'redux';

const LOAD_FAVORITE_ITEM = 'LOAD_FAVORITE_ITEM';
const DELETE_FAVORITE_ITEM = 'DELETE_FAVORITE_ITEM';

type LoadFavoriteItem = Action<typeof LOAD_FAVORITE_ITEM> & {
  item: Gadget;
};
type DeleteFavoriteItem = Action<typeof DELETE_FAVORITE_ITEM> & {
  id: string;
};

export const loadFavoriteItem = (item: Gadget): LoadFavoriteItem => (
  {
    type: LOAD_FAVORITE_ITEM,
    item,
  }
);

export const deleteFavoriteItem = (id: string): DeleteFavoriteItem => (
  {
    type: DELETE_FAVORITE_ITEM,
    id,
  }
);

export type AllActions = LoadFavoriteItem | DeleteFavoriteItem;

export type InitialFavoriteState = {
  favoriteItems: Gadget[];
};

const initialFavoriteState: InitialFavoriteState = {
  favoriteItems: [],
};

const favoritesReducer = (state = initialFavoriteState, action: AllActions) => {
  switch (action.type) {
    case LOAD_FAVORITE_ITEM: return {
      favoriteItems: [...state.favoriteItems, action.item],
    };
    case DELETE_FAVORITE_ITEM: return {
      favoriteItems: [...state.favoriteItems].filter(item => item.id !== action.id),
    };

    default: return state;
  }
};

export default favoritesReducer;
