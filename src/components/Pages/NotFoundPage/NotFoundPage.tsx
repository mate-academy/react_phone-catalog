import { NavLink } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="not-found">
      <p className="not-found__number">404</p>
      <h1 className="not-found__title">Page not found</h1>
      <NavLink to="/" className="not-found__link">Go to home page</NavLink>
    </div>
  );
};
