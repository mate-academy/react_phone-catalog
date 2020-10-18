const ADD_TO_LIKED = 'ADD_TO_LIKED';
const REMOVE_FROM_LIKED = 'REMOVE_FROM_LIKED';

export const actionCreators = {
  addToLiked: (item) => ({
    type: ADD_TO_LIKED,
    likedItem: item,
  }),

  removeFromLiked: (item) => ({
    type: REMOVE_FROM_LIKED,
    likedItem: item,
  }),
};

const likedInitialState = {
  items: [],
};

const likedReducer = (state = likedInitialState, action) => {
  switch (action.type) {
    case ADD_TO_LIKED:
      return {
        ...state,
        items: [...state.items, action.likedItem],
      };

    case REMOVE_FROM_LIKED:
      return {
        ...state,
        items: [...state.items.filter(item => item !== action.likedItem)],
      };

    default:
      return state;
  }
};

export default likedReducer;
