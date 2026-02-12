import React from 'react';
import style from './Bags.module.scss';
import bagsPng from '../assets/icons/shopping-bag-cart.svg';

export const BagCard = () => {
  return <img src={bagsPng} alt="bags icon" className={style.bagCard} />;
};
