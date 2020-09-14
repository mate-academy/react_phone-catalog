/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userEnter } from '../helpers/login';
import { setIsVerified } from '../store/isVerified';
import { setToken } from '../store/token';

interface Props {
  hideModal: () => (void);
}

export const LoginForm: React.FC<Props> = ({ hideModal }) => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const token = await userEnter(userName, password);

    if (token) {
      dispatch(setToken(token));
      localStorage.setItem('token', token);
      dispatch(setIsVerified(true));
      hideModal();
    }
  };

  return (
    <form className="form">
      <input
        className="form__input"
        type="text"
        placeholder="username"
        value={userName}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        className="form__input"
        type="password"
        placeholder="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="button" onClick={handleSubmit}> log in</button>
    </form>
  );
};
