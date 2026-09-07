import React from 'react';
import style from './Icons.module.scss';

interface Props {
  active?: boolean;
}

export const ArrowIconRight: React.FC<Props> = ({ active = false }) => {
  return (
    <div className={style.icon}>
      {active ? (
        <span className={style.icon__arrowRightActive}></span>
      ) : (
        <span className={style.icon__arrowRight}></span>
      )}
    </div>
  );
};
