import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from '../../components/BackButton/BackButton';

import './NotFoundPage.scss';

export const NotFoundPage: FC = () => {
  return (
    <div className="not-found-page">
      <section className="not-found__container">
        <BackButton />

        <div className="not-found__image-container">
          <img
            src="new/img/404-error.gif"
            alt="Page Not Found"
            className="not-found__image"
          />
        </div>

        <div className="not-found__content">
          <h1 className="not-found__title">
            The page you’re looking for can’t be found.
          </h1>

          <Link to="/" className="not-found__link">Home</Link>
        </div>
      </section>
    </div>
  );
};
