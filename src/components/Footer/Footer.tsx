/* eslint-disable max-len */
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import arrowTop from '../../Icons/Chevron (Arrow Right).svg';
export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles['footer-wrapper']}>
        <Link to="/" className={styles['footer-logo']}>
          <img className={styles['footer-img']} src={logo} alt="logo" />
        </Link>

        <ul className={styles['footer-contacts']}>
          <li className={styles['contacts-item']}>
            <Link to="/" className={styles['contacts-item']}>
              Github
            </Link>
          </li>
          <li className={styles['contacts-item']}>
            <Link to="/" className={styles['contacts-item']}>
              Contacts
            </Link>
          </li>
          <li className={styles['contacts-item']}>
            <Link to="/" className={styles['contacts-item']}>
              rights
            </Link>
          </li>
        </ul>

        <div className={styles['back-to-top__wrapper']}>
          <span className={styles['back-to-top']}>Back to top</span>
          <button
            className={styles['back-to-top__button']}
            onClick={scrollToTop}
          >
            <img
              src={arrowTop}
              alt=""
              className={styles['back-to-top__button-svg']}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
