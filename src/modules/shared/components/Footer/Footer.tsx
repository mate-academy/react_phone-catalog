import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__logo}>
        <Link to="/">
          <img
            src={`${import.meta.env.BASE_URL}img/Logo.svg`}
            alt="Nice Gadgets Logo"
          />
        </Link>
      </div>

      <nav className={styles.footer__nav}>
        <Link
          to="https://github.com/nyarachun/react_phone-catalog"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footer__link}
        >
          Github
        </Link>
        <Link to="tel:+380991234567" className={styles.footer__link}>
          Contacts
        </Link>
        <Link to="/rights" className={styles.footer__link}>
          Rights
        </Link>
      </nav>

      <div className={styles['footer__button-back-to-top']}>
        <button onClick={scrollToTop} className={styles['footer__back-to-top']}>
          <span className={styles['footer__back-text']}>Back to top</span>
          <div className={styles['footer__arrow-circle']}>
            <img
              src={`${import.meta.env.BASE_URL}img/icons/arrow_up_black.svg`}
              alt="Arrow Up"
            />
          </div>
        </button>
      </div>
    </footer>
  );
};
