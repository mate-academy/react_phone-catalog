import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1 className="not-found-page__title">
        Page not found
      </h1>

      <Link to="/" className="not-found-page__link">
        to Home Page
      </Link>
    </div>
  );
};
