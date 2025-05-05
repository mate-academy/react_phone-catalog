import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

import FooterLogo from '../../../assets/icons/footer-icons/footer__logo.svg';
import ScrollToTop from '../../../assets/icons/footer-icons/scroll-to-top.svg';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Link to="/" className={styles.footer__logoLink}>
          <img src={FooterLogo} alt="Логотип" className={styles.footer__logo} />
        </Link>

        <nav className={styles.footer__nav}>
          <ul className={styles.footer__list}>
            <li className={styles.footer__item}>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/stanishevskyy"
                className={styles.footer__link}
              >
                Github
              </a>
            </li>
            <li className={styles.footer__item}>
              <Link to="/contacts" className={styles.footer__link}>
                Contacts
              </Link>
            </li>
            <li className={styles.footer__item}>
              <Link to="/rights" className={styles.footer__link}>
                Rights
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.footer__wrapper}>
          <p className={styles.footer__backTop}>Back to top</p>
          <button
            className={styles.footer__backTopBlock}
            onClick={handleScrollToTop}
            aria-label="Переміститись на початок сторінки"
          >
            <img
              src={ScrollToTop}
              alt="Переміститись на початок сторінки"
              className={styles.footer__arrow}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
