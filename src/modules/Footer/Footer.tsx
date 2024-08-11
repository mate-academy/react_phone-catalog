import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import classNames from 'classnames';

export const Footer = () => {
  const backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <footer className={classNames(styles.footer)}>
      <Link className={styles.footer__logo} to="/">
        <img src="img/Logo.svg" alt="Logo" />
      </Link>

      <div className={classNames(styles.footer__menu, styles.menu)}>
        <nav className={styles.menu__nav}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <a className={styles.menu__link} href="#github">
                Github
              </a>
            </li>

            <li className={styles.menu__item}>
              <a className={styles.menu__link} href="#contacts">
                Contacts
              </a>
            </li>

            <li className={styles.menu__item}>
              <a className={styles.menu__link} href="#rights">
                Rights
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.footer__back} onClick={backToTop}>
        <span className={styles['footer__back-text']}>Back to top</span>
        <span className={styles['footer__back-button']}></span>
      </div>
    </footer>
  );
};
