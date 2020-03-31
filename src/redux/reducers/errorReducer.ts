import { AnyAction } from 'redux';
import { type } from '../actions';

const errorState: ErrorState = {
  error: null,
};

export const errorReducer = (
  state = errorState, action: AnyAction,
): ErrorState => {
  switch (action.type) {
    case type.SET_ERROR:
      return {
        error: action.error,
      };

    default:
      return state;
  }
};
