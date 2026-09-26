import { NavLink } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div>
      <p>Page not found</p>
      <NavLink to="/">Go to Home Page</NavLink>
    </div>
  );
};
