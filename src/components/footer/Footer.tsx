import React from 'react';
import Styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={Styles['footer']}>
      <p className={Styles['footer__logo']}>
        <img
          className={Styles['footer__logo__img']}
          src="./img/svg/header_Logo.svg"
          alt="logo"
        />
      </p>

      <div className={Styles['footer__links']}>
        <a
          target="_blank"
          rel="noreferrer"
          className={Styles['footer__links__item']}
          href="https://github.com/mate-academy/react_phone-catalog"
        >
          Github
        </a>
        <a className={Styles['footer__links__item']} href="#con">
          Contacts
        </a>
        <a className={Styles['footer__links__item']} href="#rights">
          rights
        </a>
      </div>
    </footer>
  );
};
