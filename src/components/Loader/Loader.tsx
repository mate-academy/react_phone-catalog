import React from 'react';
import style from './Loader.module.scss';

export const Loader: React.FC = () => (
  <div className={style.loader} data-cy="loader">
    <div className={style.loader__content} />
  </div>
);
