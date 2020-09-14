import { AnyAction } from 'redux';

const SET_IS_VERIFIED = 'SET_IS_VERIFIED';

export const setIsVerified = (status: boolean) => ({ type: SET_IS_VERIFIED, payload: status });

const reducer = (status = false, action: AnyAction) => {
  switch (action.type) {
    case SET_IS_VERIFIED:
      return action.payload;

    default:
      return status;
  }
};

export default reducer;
