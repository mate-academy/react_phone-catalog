import React from 'react';
import style from './Icons.module.scss';

export const HeartIconFilled: React.FC = () => {
  return (
    <div className={style.icon}>
      <span className={style.icon__heartFilled}></span>
    </div>
  );
};
