import './NotFoundPage.scss';
import { Link, useLocation } from 'react-router-dom';

export const NotFoundPage = () => {
  const { pathname } = useLocation();

  return (
    <div className="not-found-page">
      <h1 className="not-found-page__title-404">
        404
      </h1>
      <p className="not-found-page__title">Page not found</p>

      <p className="not-found-page__info">
        The requested URL
        <span className="not-found-page__info-link">{pathname}</span>
        was not found.
      </p>

      <p className="not-found-page__info">
        Click
        <Link
          to=".."
          className="not-found-page__link"
        >
          here
        </Link>
        to continue shopping.
      </p>
    </div>
  );
};
