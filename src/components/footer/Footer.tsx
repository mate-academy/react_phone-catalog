import React from 'react';
import styles from './Footer.module.scss';
// import { Link, NavLink } from 'react-router-dom';

export const Footer: React.FC = () => {

  const scrollToHeader = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    const headerElement = document.getElementById('header');
    if (headerElement) {
      headerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles['footer']}>
      <p className={styles['footer__logo']} >
        <img className={styles['footer__logo__img']} src="./img/svg/Nice_Gadgets_logo.svg" alt="logo" />
      </p>

      <div className={styles['footer__links']}>
        <a className={styles['footer__links__item']} href="#git">Github</a>
        <a className={styles['footer__links__item']} href="#con">Contacts</a>
        <a className={styles['footer__links__item']} href="#rights">rights</a>
      </div>

      <div className={styles['footer__back']}>
        <p className={styles['footer__back__paragraph']}>Back to top</p>
        <a className={styles['footer__back__link']} onClick={scrollToHeader} href="#header">
        </a>
      </div>
    </div>
  );
};
