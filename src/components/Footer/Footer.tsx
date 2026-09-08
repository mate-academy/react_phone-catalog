import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.scss';

const handleClickTopButton = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer = () => {
  const { pathname } = useLocation();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles['footer__logo-container']}>
          <Link
            to="/"
            onClick={e => {
              if (pathname === '/') {
                e.preventDefault();
                handleClickTopButton();
              }
            }}
          >
            <img
              className={styles.footer__logo}
              src="./img/logo.svg"
              alt="Logo"
            />
          </Link>
        </div>

        <nav className={styles.footer__navigation}>
          <ul className={styles['footer__navigation-list']}>
            <li className={styles['footer__navigation-item']}>
              <a
                href="https://github.com/dmytro-popovych/react_phone-catalog"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li className={styles['footer__navigation-item']}>
              <Link to="/contacts">Contacts</Link>
            </li>
            <li className={styles['footer__navigation-item']}>
              <Link to="/rights">Rights</Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={handleClickTopButton}
          className={styles.footer__button}
        >
          <span className={styles['footer__button-text']}>Back to top</span>
          <img
            className={styles['footer__button-icon']}
            src="./icons/chevron-arrow-right.svg"
            alt="Scroll to top"
          />
        </button>
      </div>
    </footer>
  );
};
