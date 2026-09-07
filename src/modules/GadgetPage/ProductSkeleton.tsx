import React from 'react';
import style from './ProductSkeleton.module.scss';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className={style.skeleton}>
      <div className={style.skeleton__image} />
      <div className={style.skeleton__text} />
      <div className={style.skeleton__text} />
      <div className={style.skeleton__button} />
    </div>
  );
};
