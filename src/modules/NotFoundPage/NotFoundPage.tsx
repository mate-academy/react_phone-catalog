import React from 'react';
import notFoundPageStyles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={notFoundPageStyles.notFound}>
      <img
        src="/public/img/page-not-found.png"
        alt=""
        className={notFoundPageStyles.notFound__image}
      />
    </div>
  );
};
