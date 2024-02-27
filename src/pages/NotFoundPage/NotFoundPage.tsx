import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-page__title">
        Page not found.
      </div>

      <Link
        className="not-found-page__link-home"
        to="/"
      >
        Click to return on home page.
      </Link>
    </div>
  );
};
