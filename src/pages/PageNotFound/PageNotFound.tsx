import { Link } from 'react-router-dom';
import './PageNotFound.scss';

export const PageNotFound = () => {
  return (
    <div className="container container--with-min-height">
      <div className="page-not-found">
        <h1 className="main-title">404</h1>
        <p>Sorry, but we don&apos;t have the page you&apos;re looking for</p>
        <Link
          type="button"
          to="/"
          className="button page-not-found__button"
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
};
