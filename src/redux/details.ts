import { AnyAction } from 'redux';

const SET_DETAILS = 'SET_DETAILS';

export const setDetails = (details: ProductDetails) => ({ type: SET_DETAILS, details });

const detailsReducer = (details = {}, action: AnyAction) => {
  switch (action.type) {
    case SET_DETAILS:
      return action.details;

    default:
      return details;
  }
};

export default detailsReducer;
