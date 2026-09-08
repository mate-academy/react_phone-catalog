import React from 'react';
import style from './Loader.module.scss';
import logo from '../../shared/icons/logo.png';

export const Loader: React.FC = () => {
  return (
    <div className={style.loader}>
      <span className={style.loaderItem}></span>
      <img src={logo} alt="" className={style.logo} />
    </div>
  );
};
