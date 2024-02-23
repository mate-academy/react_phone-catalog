import { NavLink } from 'react-router-dom';
import './Error.scss';

interface Props {
  error: string,
}

export const Error: React.FC<Props> = ({ error }) => (
  <div className="error">
    <h1 className="error__title">Oooops!</h1>
    <h2 className="error__text">{error}</h2>
    <NavLink to="/" className="error__link">
      Back to home page
    </NavLink>
  </div>
);
