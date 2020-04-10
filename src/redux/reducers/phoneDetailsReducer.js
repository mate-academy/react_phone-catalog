import { SET_PHONE_DETAILS } from './constants';

const initialState = {
  details: null,
};

export const phoneDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHONE_DETAILS:
      return {
        ...state,
        details: action.details,
      };

    default:
      return state;
  }
};
