import React from 'react';
import style from './Icons.module.scss';

interface Props {
  className?: string;
}

export const ArrowDownIcon: React.FC<Props> = ({ className }) => {
  return (
    <div className={`${style.icon__arrowDown} ${className}`}>
      <span className={style.icon__arrowDown}></span>
    </div>
  );
};
