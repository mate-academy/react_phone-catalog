import { getPhones } from '../../api/api';
import { SET_PHONES, TOGGLE_IS_FETCHING } from './constants';
import { setPhonesAC, toggleIsFetchingAC } from './actionCreators';

const initialState = {
  phones: [],
  isFetching: false,
};

export const phonesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHONES:
      return {
        ...state,
        phones: [...action.phones],
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

export const getPhonesThunkCreator = () => (dispatch) => {
  dispatch(toggleIsFetchingAC(true));

  getPhones()
    .then(data => {
      dispatch(toggleIsFetchingAC(false));
      dispatch(setPhonesAC(data));
    });
};
