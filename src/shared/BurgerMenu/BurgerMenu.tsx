import React from 'react';
import style from './BurgerMenu.module.scss';
import burgerPng from '../assets/icons/menu.svg';

export const BurgerMenu = () => {
  return <img src={burgerPng} alt="burger menu" className={style.burger} />;
};
