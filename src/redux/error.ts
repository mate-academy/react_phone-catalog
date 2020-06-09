import { Action } from 'redux';

const SET_ERROR = 'SET_ERROR';

type SetError = Action<typeof SET_ERROR> & {
  error: string;
};

export const setError = (error: string) => (
  { type: SET_ERROR, error }
);

type AllowedActions = SetError;

const reducer = (error = '', action: AllowedActions): string => {
  switch (action.type) {
    case SET_ERROR:
      return action.error;

    default:
      return error;
  }
};

export default reducer;
