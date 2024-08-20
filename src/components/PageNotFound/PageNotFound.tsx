import { Link } from 'react-router-dom';
import { Path } from '../Path';

export const PageNotFound = () => {
  return (
    <main className="page-not-found flex">
      <div className="page-not-found__block">
        <Path parentClassName="page-not-found" />
        <h1 className="page-not-found__title">Page not found</h1>
        <Link to="/#" className="page-not-found__home-link button">
          Back to home
        </Link>
      </div>
    </main>
  );
};
