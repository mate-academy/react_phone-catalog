/* eslint-disable no-console */
import { Dispatch } from 'redux';

interface User {
  userName: string;
  password: string;
}
const loginUser = (userObj: User) => ({
  type: 'LOGIN_USER',
  payload: userObj,
});

export const userPostFetch = (userName: string, password: string) => {
  return async (dispatch: Dispatch) => {
    const user = { password, userName };

    const resp = await fetch('https://login-956f6.firebaseio.com/users.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ user }),
    });

    const data = await resp.json();

    console.log(resp, data.jwt, 'data');

    if (data.message) {
      console.log(data.message);
    } else {
      localStorage.setItem('token', data.jwt);
      dispatch(loginUser(data.user));
    }
  };
};
