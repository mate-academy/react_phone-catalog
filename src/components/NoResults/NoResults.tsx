import { NavLink } from 'react-router-dom';
import './NoResults.scss';

export const NoResults = () => {
  return (
    <div className="no-results">
      <h1 className="no-results__title">
        Oops!
      </h1>
      <p className="no-results__text">
        Seems like we don&apos;t have any products
        in this section right now
      </p>
      <NavLink
        type="button"
        to="/"
        className="button no-results__button"
      >
        Go to home page
      </NavLink>
    </div>
  );
};
