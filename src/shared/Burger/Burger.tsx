import React from 'react';
import style from './Burger.module.scss';
import burgerIcon from '../assets/icons/menu.svg';

export const Burger: React.FC = () => {
  return <img src={burgerIcon} alt="Burger icon" className={style.burger} />;
};
