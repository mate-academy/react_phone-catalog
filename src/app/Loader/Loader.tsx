import React from 'react';
import style from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={style.loader}>
      <div className={style.loader__spinner} />
    </div>
  );
};
