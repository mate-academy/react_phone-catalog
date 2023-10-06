import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './AuthForm.scss';
import { Link } from 'react-router-dom';

export const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (email === '') {
      setEmailError(true);
    }

    if (password === '') {
      setPasswordError(true);
    }

    if (email && password) {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <>
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <h2 className="form__title">Login Form</h2>
        <TextField
          label="Email"
          onChange={e => setEmail(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="email"
          sx={{ mb: 3 }}
          fullWidth
          value={email}
          error={emailError}
          className="form__input"
        />
        <TextField
          label="Password"
          onChange={e => setPassword(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="password"
          value={password}
          error={passwordError}
          fullWidth
          sx={{ mb: 3 }}
          className="form__input"
        />
        <Button
          variant="outlined"
          color="secondary"
          type="submit"
          className="form__button"
        >
          Login
        </Button>
      </form>
      <small className="register">
        Need an account?
        {' '}
        <Link
          className="register__button"
          to="/create-account"
        >
          Register here
        </Link>
      </small>
    </>
  );
};
