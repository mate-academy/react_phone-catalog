import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

import logoIcon from './../../images/header/Logo.png';
import arrowUp from './../../images/icons/arrow-up.svg';
import { scrollToTop } from '../../utils/utils';

const {
  footer,
  footer__wrapper,
  footer__logo,
  footer__nav,
  footer__list,
  footer__item,
  footer__link,
  footer__back,
  footer__top,
  footer__button,
  footer__image,
} = styles;

export const Footer = () => {
  return (
    <footer className={footer}>
      <div className="container">
        <div className={footer__wrapper}>
          <Link to="/" className={footer__logo}>
            <img src={logoIcon} className={footer__image} alt="logo" />
          </Link>
          <nav className={footer__nav}>
            <ul className={footer__list}>
              <li className={footer__item}>
                <Link to="#" className={footer__link}>
                  Github
                </Link>
              </li>
              <li className={footer__item}>
                <Link to="#" className={footer__link}>
                  Contacts
                </Link>
              </li>
              <li className={footer__item}>
                <Link to="#" className={footer__link}>
                  rights
                </Link>
              </li>
            </ul>
          </nav>
          <div className={footer__back} onClick={scrollToTop}>
            <div className={footer__top}>Back to top</div>
            <button className={footer__button}>
              <img className={footer__image} src={arrowUp} alt="Back to top" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
