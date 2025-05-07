import React, { useState } from 'react';

import { create } from '../../api/users';
import { addAlert } from '../../utils/helpers/helpers';

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialInputBody = {
  email: '',
  password: '',
};

export const Login: React.FC<Props> = ({ setIsLoggedIn }) => {
  const [data, setData] = useState(initialInputBody);
  const { email, password } = data;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(body => ({ ...body, [e.target.type]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // handle this one better
    if (!email.trim() || !password.trim()) {
      return;
    }

    const response = await create({ email, password });

    if (response.data.message === 'The password is incorrect') {
      addAlert('error', response.data.message);

      return;
    }

    localStorage.setItem('auth_token', response.data.token);

    addAlert('success', response.data.message);
    setIsLoggedIn(true);
    setData(initialInputBody);
  };

  return (
    <div className="login">
      <form className="login__form" action="#" onSubmit={onSubmit}>
        <h2 className="login__title">Here you can sign up:</h2>

        <div className="login__inputs">
          <input
            type="email"
            className="login__input"
            placeholder="Come up with an email"
            value={email}
            onChange={onChange}
          />

          <input
            type="password"
            className="login__input"
            placeholder="Come up with a password"
            value={password}
            onChange={onChange}
          />
        </div>

        <button className="login__button">Submit</button>
      </form>

      <div className="login__block" />
    </div>
  );
};
