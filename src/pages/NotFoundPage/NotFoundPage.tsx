import React from 'react';
import style from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={style['not-found__wrapper']}>
      <img
        src="img/page-not-found.png"
        alt="not found image"
        className={style['not-found__image']}
      />
    </div>
  );
};
