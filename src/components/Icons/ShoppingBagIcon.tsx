import React from 'react';
import style from './Icons.module.scss';

interface Props {
  count: number;
}

export const ShoppingBagIcon: React.FC<Props> = ({ count = 0 }) => {
  return (
    <div className={style.icon}>
      <span className={style.icon__shopingBag}></span>
      {count > 0 && <span className={style.icon__counter}>{count}</span>}
    </div>
  );
};
