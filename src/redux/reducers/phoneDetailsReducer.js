const SET_PHONE_DETAILS = 'SET_PHONE_DETAILS';

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

export const setPhoneDetailsAC = (details) => ({
  type: SET_PHONE_DETAILS, details,
});
