import { Link, useLocation } from 'react-router-dom';
import './NoResults.scss';

export const NoResults = () => {
  const { pathname } = useLocation();

  return (
    <div className="no-results">
      <h2>
        {`${pathname.replace('/', '')} not found`}
      </h2>

      <Link
        to="/"
        className="no-results__text"
      >
        Go to Main page
      </Link>
    </div>
  );
};
