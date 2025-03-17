import { NavLink } from 'react-router-dom';

import styles from './Footer.module.scss';
import logo from '../../imgs/svg/Logo.svg';
import arrowUp from '../../imgs/svg/arrow-up-icon.svg';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <NavLink to="/">
        <img src={logo} alt="logo" className={styles.footer__logo} />
      </NavLink>

      <div className={styles.footer__links}>
        <a href="#" className={styles.footer__link}>
          Github
        </a>
        <a href="#" className={styles.footer__link}>
          Contacts
        </a>
        <a href="#" className={styles.footer__link}>
          rights
        </a>
      </div>

      <button
        type="button"
        className={styles.footer__button}
        onClick={scrollToTop}
      >
        <p className={styles.footer__button_text}>Back to top</p>
        <img
          src={arrowUp}
          alt="arrow-up"
          className={styles.footer__button_img}
        />
      </button>
    </footer>
  );
};
