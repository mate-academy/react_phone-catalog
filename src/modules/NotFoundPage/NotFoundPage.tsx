import React from 'react';
import style from './NotFoundPage.module.scss';
import pageNotFound from '../../../public/img/page-not-found.png';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={style.page}>
      <img src={pageNotFound} alt="Page not found" className={style.img} />
    </div>
  );
};
