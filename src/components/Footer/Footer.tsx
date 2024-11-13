/* eslint-disable react/react-in-jsx-scope */
import { Link, useLocation } from 'react-router-dom';

import { Logo } from '../Logo';

import styles from './Footer.module.scss';
import top from '../../images/icons/arrow_up.svg';

export const Footer = () => {
  const { pathname } = useLocation();

  const handleClickToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (pathname === '/menu') {
    return null;
  }

  return (
    <div className={styles.footer}>
      <Logo className={styles.footer__logo} />

      <div className={styles.footer__link_container}>
        <Link to="/" className={styles.footer__item}>
          Github
        </Link>
        <Link to="/" className={styles.footer__item}>
          Contacts
        </Link>
        <Link to="/" className={styles.footer__item}>
          Rights
        </Link>
      </div>

      <div className={styles.footer__button_container}>
        <span className={styles.footer__text}>Back to top</span>
        <button className={styles.footer__button} onClick={handleClickToTop}>
          <img src={top} alt="Arrow-Up" className={styles.footer__image} />
        </button>
      </div>
    </div>
  );
};
