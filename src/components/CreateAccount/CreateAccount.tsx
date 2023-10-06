import React, { useState } from 'react';
import {
  TextField, Button, Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';

export const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit} action="POST">
        <h2 className="form__title">Register Form</h2>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="First Name"
            onChange={e => setFirstName(e.target.value)}
            value={firstName}
            fullWidth
            required
            className="form__input"
          />
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Last Name"
            onChange={e => setLastName(e.target.value)}
            value={lastName}
            fullWidth
            required
            className="form__input"
          />
        </Stack>
        <TextField
          type="email"
          variant="outlined"
          color="secondary"
          label="Email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          fullWidth
          required
          sx={{ mb: 4 }}
          className="form__input"
        />
        <TextField
          type="password"
          variant="outlined"
          color="secondary"
          label="Password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          required
          fullWidth
          sx={{ mb: 4 }}
          className="form__input"
        />
        <Button
          variant="outlined"
          color="secondary"
          type="submit"
          className="form__button"
        >
          Register
        </Button>
      </form>
      <small className="register">
        Already have an account?
        <Link
          className="register__button"
          to="/authentication"
        >
          Login Here
        </Link>
      </small>

    </>
  );
};
