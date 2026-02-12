import React from 'react';
import style from './Icons.module.scss';

interface Props {
  active?: boolean;
}

export const ArrowIconLeft: React.FC<Props> = ({ active = false }) => {
  return (
    <div className={style.icon}>
      {active ? (
        <span className={style.icon__arrowLeft}></span>
      ) : (
        <span className={style.icon__arrowLeftActive}></span>
      )}
    </div>
  );
};
