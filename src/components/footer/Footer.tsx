import React from 'react';
import Styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <div className={Styles['footer']}>
      <p className={Styles['footer__logo']} >
        <img className={Styles['footer__logo__img']} src="./img/svg/Nice_Gadgets_logo.svg" alt="logo" />
      </p>

      <div className={Styles['footer__links']}>
        <a className={Styles['footer__links__item']} href="#git">Github</a>
        <a className={Styles['footer__links__item']} href="#con">Contacts</a>
        <a className={Styles['footer__links__item']} href="#rights">rights</a>
      </div>
    </div>
  );
};
