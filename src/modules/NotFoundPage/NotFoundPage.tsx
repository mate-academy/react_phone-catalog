import React from 'react';
import style from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={style.not_found_page}>
      <h2 className={style.not_found_page__title}>Page not Found</h2>

      <img
        className={style.not_found_page__image}
        src="img/page-not-found.png"
        alt="Page not found"
      />
    </div>
  );
};
