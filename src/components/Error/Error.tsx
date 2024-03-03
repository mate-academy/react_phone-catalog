import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { ErrorProps } from './types';
import './Error.scss';

export const Error = memo<ErrorProps>(({ error }) => (
  <div className="error">
    <h1 className="error__title">Oooops!</h1>
    <h2 className="error__text">{error}</h2>
    <NavLink to="/" className="error__link">
      Back to home page
    </NavLink>
  </div>
));
