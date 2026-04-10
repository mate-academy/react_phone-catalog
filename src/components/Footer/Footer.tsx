import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { Icon } from '../Icon';
export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Link to="/" className={styles.footer__logo}>
          <Icon name="logo" />
        </Link>
        <nav className={styles.footer__nav}>
          <ul className={styles.footer__list}>
            <li className={styles.footer__item}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
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
        <div className={styles.footer__backToTop}>
          <p className={styles.footer__backText}>Back to top</p>
          <button
            type="button"
            className={styles.footer__button}
            onClick={scrollToTop}
          >
            <Icon name="up" />
          </button>
        </div>
      </div>
    </footer>
  );
};
