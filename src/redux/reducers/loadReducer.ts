import { AnyAction } from 'redux';
import { type } from '../actions';

const loadState: LoadState = {
  isLoading: false,
  isLoaded: false,
};

export const loadReducer = (
  state = loadState, action: AnyAction,
): LoadState => {
  switch (action.type) {
    case type.SET_IS_LOADED:
      return {
        ...state,
        isLoaded: action.isLoaded,
      };

    case type.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
};
