import React from 'react';
import notFoundPageStyles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export const NotFoundPage = () => {
  return (
    <div className={notFoundPageStyles.notFound}>
      <h1 className={notFoundPageStyles.notFound__title}>
        Oops! Page not found
      </h1>
      <p className={notFoundPageStyles.notFound__text}>
        Looks like the page you&apos;re looking for has gone missing.
        <Link
          to={ROUTES.HOME}
          className={notFoundPageStyles.notFound__linkHome}
        >
          Go to Home
        </Link>
      </p>
      <img
        src="/public/img/page-not-found.png"
        alt=""
        className={notFoundPageStyles.notFound__image}
      />
    </div>
  );
};
