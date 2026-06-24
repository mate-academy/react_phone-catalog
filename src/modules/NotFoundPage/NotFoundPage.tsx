import React from 'react';
import style from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={style['not-found-page']}>
      <h2 className={style['not-found-page__title']}>Page not found</h2>
      <img
        src="img/page-not-found.png"
        alt=""
        className={style['not-found-page__image']}
      />
    </div>
  );
};
