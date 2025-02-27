import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import logo from '../../media/img/Logo.svg';
import classNames from 'classnames';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.footer__content}>
          <Link to="home" className={styles.footer__link}>
            <img src={logo} alt="logo" className={styles.footer__logo} />
          </Link>
          <ul className={styles.footer__items}>
            <li className={styles.footer__item}>
              <a href="#" className={styles['footer__item-link']}>
                Github
              </a>
            </li>
            <li className={styles.footer__item}>
              <a href="#" className={styles['footer__item-link']}>
                Contacts
              </a>
            </li>
            <li className={styles.footer__item}>
              <a href="#" className={styles['footer__item-link']}>
                rights
              </a>
            </li>
          </ul>
          <div className={classNames(styles.footer__back, styles.back)}>
            <p className={styles.back__text}>Back to top</p>
            <button
              className={styles.back__button}
              onClick={scrollToTop}
            ></button>
          </div>
        </div>
      </div>
    </>
  );
};
