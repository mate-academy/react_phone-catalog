import { getPhones } from '../../api/api';

const SET_PHONES = 'SET_PHONES';

const initialState = {
  phones: [],
};

export const phonesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHONES:
      return {
        ...state,
        phones: [...action.phones],
      };
    default:
      return state;
  }
};

export const setPhonesActionCreators = (phones) => ({
  type: SET_PHONES, phones,
});

export const getPhonesThunkCreator = () => (dispatch) => {
  getPhones()
    .then(data => {
      dispatch(setPhonesActionCreators(data));
    });
};
