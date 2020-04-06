import { AnyAction } from 'redux';
import { type } from '../actions';

const likesState: LikesState = {
  likes: [],
};

export const likesReducer = (
  state = likesState, action: AnyAction,
): LikesState => {
  switch (action.type) {
    case type.SET_LIKES:
      return {
        likes: action.likes,
      };

    default:
      return state;
  }
};
