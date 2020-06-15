import { AnyAction } from 'redux';

const ADD_FAVOURITE_GOOD = 'ADD_FAVOURITE_GOOD';
const REMOVE_FAVOURITE_GOOD = 'REMOVE_FAVOURITE_GOOD';

export const addFavouriteGood = (good: Good) => ( {type: ADD_FAVOURITE_GOOD, good} );
export const removeFavouriteGood = (id: string) => ( {type: REMOVE_FAVOURITE_GOOD, id} );

let initialState: Good[] = [];

if (localStorage.getItem('favoriteProducts')) {
  initialState = [...JSON.parse(localStorage.getItem('favoriteProducts') || '')];
}

const favouritesReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_FAVOURITE_GOOD:
      return [...state, {...action.good}];

    case REMOVE_FAVOURITE_GOOD:
      return [...state].filter(good => good.id !== action.id);

    default:
      return state;
  }
};

export default favouritesReducer;
