import { AnyAction } from 'redux';

const SET_ERROR = 'SET_ERROR';

export const setError = (error: string) => ({ type: SET_ERROR, error });


const reducer = (error = '', action: AnyAction): string => {
  switch (action.type) {
    case SET_ERROR:
      return action.error;

    default:
      return error;
  }
};

export default reducer;
