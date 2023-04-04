import { FC } from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage: FC = () => (
  <div
    className="
    main__products-page
    main__products-page--width
    products-page
    not-found-page
    "
  >
    <h1 className="not-found-page__title page-title">Page not found</h1>

    <Link to="/" className="not-found-page__link">
      Go Home
    </Link>

    <div className="no-results__image-container">
      <img
        src="./img/img/Not_found_page.jpg"
        alt="No results"
        className="no-results__image"
      />
    </div>
  </div>
);
