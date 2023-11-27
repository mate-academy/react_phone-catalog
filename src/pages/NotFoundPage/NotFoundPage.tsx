import { FC } from 'react';
import { Link } from 'react-router-dom';

import './NotFoundPage.scss';

export const NotFoundPage: FC = () => {
  return (
    <div
      className="
        main__products-page
        main__products-page--width
        products-page
        not-found-page
      "
    >
      <h1 className="not-found-page__ title page-title">Page not found</h1>

      <Link to="/" className="not-found-page__link">
        Home Page
      </Link>

      <div className="no-results__image-container">
        <img
          src="img/pageNotFound.jpg"
          alt="Not found page"
          className="no-results__image"
        />
      </div>
    </div>
  );
};
