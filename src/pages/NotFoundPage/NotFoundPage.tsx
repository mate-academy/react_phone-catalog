import './NotFoundPage.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1 className="not-found-page__title">404 Page not found</h1>

      <p className="not-found-page__message">
        {'Requested page does not exist. Click '}
        <Link
          to="/"
          className="not-found-page__link"
        >
          here
        </Link>
        {' to continue shopping.'}
      </p>
    </div>
  );
};
