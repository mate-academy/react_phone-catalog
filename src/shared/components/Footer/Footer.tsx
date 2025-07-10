import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

import FooterLogo from '../../../assets/icons/header-icons/logo.svg';
import ScrolArrow from '../../../assets/icons/footer-icons/scrol-arrow.svg';

export const Footer = () => {
  const handleToTop = () => {
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
                href="https://github.com/maximka-gif"
                className={styles.footer__link}
                rel="noreferrer"
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
          <button className={styles.footer__backTopBtn} onClick={handleToTop}>
            <img
              src={ScrolArrow}
              alt="Переміститись на початок сторінки"
              className={styles.footer__arrow}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
