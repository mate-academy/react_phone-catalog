import React from 'react';
import style from './Skeleton.module.scss';

type Props = {
  count?: number;
};

export const SkeletonCard: React.FC<Props> = ({ count }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div className={style.container} key={index}>
            <div className={style.img}></div>
            <div className={style.title}></div>
            <div className={style.price}></div>
            <div className={style.specs}>
              <div className={style.text}></div>
              <div className={style.text}></div>
              <div className={style.text}></div>
            </div>
            <div className={style.buttons}></div>
          </div>
        ))}
    </>
  );
};
