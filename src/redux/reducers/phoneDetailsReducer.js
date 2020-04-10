import { getPhoneDetails } from '../../api/api';
import { SET_PHONE_DETAILS, TOGGLE_IS_FETCHING } from './constants';
import { setPhoneDetailsAC, toggleIsFetchingAC } from './actionCreators';

const initialState = {
  details: null,
  isFetching: false,
};

export const phoneDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHONE_DETAILS:
      return {
        ...state,
        details: action.details,
      };

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    default:
      return state;
  }
};

export const getPhoneDetailsThunkCreator = () => (dispatch) => {
  dispatch(toggleIsFetchingAC(true));

  getPhoneDetails()
    .then(data => {
      dispatch(toggleIsFetchingAC(false));
      dispatch(setPhoneDetailsAC(data));
    });
};
