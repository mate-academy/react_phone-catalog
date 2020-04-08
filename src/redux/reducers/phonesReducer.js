import { getPhones } from '../../api/api';

const SET_PHONES = 'SET_PHONES';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

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

const setPhonesActionCreators = (phones) => ({
  type: SET_PHONES, phones,
});

const toggleIsFetchingActionCreator = (isFetching) => ({
  type: TOGGLE_IS_FETCHING, isFetching,
});

export const getPhonesThunkCreator = () => (dispatch) => {
  dispatch(toggleIsFetchingActionCreator(true));

  getPhones()
    .then(data => {
      dispatch(toggleIsFetchingActionCreator(false));
      dispatch(setPhonesActionCreators(data));
    });
};
