import React from 'react';
import Styles from './Footer.module.scss';
// import { Link, NavLink } from 'react-router-dom';

export const Footer: React.FC = () => {

  // const scrollToHeader = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  //   event.preventDefault();
  //   const headerElement = document.getElementById('header');
  //   if (headerElement) {
  //     headerElement.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

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

      {/* <div className={Styles['footer__back']}>
        <p className={Styles['footer__back__paragraph']}>Back to top</p>
        <a className={Styles['footer__back__link']} onClick={scrollToHeader} href="#header">
        </a>
      </div> */}
    </div>
  );
};
