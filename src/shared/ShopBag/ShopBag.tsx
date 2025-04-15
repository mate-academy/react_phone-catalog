import React from 'react';
import style from './ShopBag.module.scss';
import shopIcon from '../assets/icons/shopping-bag-cart.svg';

export const ShopBag: React.FC = () => {
  return <img src={shopIcon} alt="Shop icon" className={style.shopBag} />;
};
