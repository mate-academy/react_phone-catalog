import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../public/img/logo/Logo.svg';
import arrowUp from '../../public/img/icons/ArrowUp.svg';
import '../App.scss';
import { FooterProps } from '../types/Footer';
import styles from './Footer.module.scss';

export const Footer: React.FC<FooterProps> = ({ topRef }) => {
  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <a href="/" className={styles.footer__logo}>
          <img src={logo} alt="Logo" />
        </a>

        <nav className={styles.footer__nav}>
          <ul className={styles.footer__navList}>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__navLink}
              >
                GITHUB
              </a>
            </li>
            <li>
              <NavLink to="/contacts" className={styles.footer__navLink}>
                CONTACTS
              </NavLink>
            </li>
            <li>
              <NavLink to="/rights" className={styles.footer__navLink}>
                RIGHTS
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.footer__elements}>
          <p className={styles.footer__text}>Back to top</p>
          <button onClick={scrollToTop} className={styles.footer__button}>
            <img
              src={arrowUp}
              alt="Arrow up"
              className={styles.footer__image}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
