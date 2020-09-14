import { AnyAction } from 'redux';

const SET_TOKEN = 'SET_TOKEN';

export const setToken = (token: string) => ({ type: SET_TOKEN, payload: token });

const reducer = (token = '', action: AnyAction) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.payload;

    default:
      return token;
  }
};

export default reducer;
