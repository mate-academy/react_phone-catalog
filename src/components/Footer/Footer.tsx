import React from 'react';
import styles from './Footer.module.scss';
import { NavLink } from 'react-router-dom';
import logo from './components/img/logo.png';
import slider from './components/img/slider-button.png';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <img src={logo} alt="logo" className={styles.logo__image} />
        </NavLink>

        <nav className={styles.nav}>
          <a
            className={styles.nav__link}
            target="_blank"
            href="https://github.com/qlaudy/react_phone-catalog"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a className={styles.nav__link} href="mailto:dkuz6323@gmail.com">
            Contacts
          </a>
          <a
            className={styles.nav__link}
            href="https://www.linkedin.com/in/qlaudy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
        </nav>

        <div className={styles.button__bottom}>
          <button
            className={styles.button__top__text}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top
          </button>
          <button
            className={styles.button__top}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src={slider}
              alt="slider"
              className={styles.button__top__image}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
