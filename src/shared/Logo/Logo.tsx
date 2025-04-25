import React from 'react';
import style from './Logo.module.scss';
import logoPng from '../assets/icons/logo.png';

export const Logo: React.FC = () => {
  return <img src={logoPng} alt="Logo" className={style.logo} />;
};
