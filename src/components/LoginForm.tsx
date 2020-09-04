/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userPostFetch } from '../helpers/login';

export const LoginForm: React.FC = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(userPostFetch(userName, password));
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
