import { AnyAction } from 'redux';

const SET_GOOD_DETAILS = 'SET_DETAILS';

export const setGoodDetails = (details: GoodDetails) => ({ type: SET_GOOD_DETAILS, details });

const detailsReducer = (details = {}, action: AnyAction) => {
  switch (action.type) {
    case SET_GOOD_DETAILS:
      return action.details;

    default:
      return details;
  }
};

export default detailsReducer;
