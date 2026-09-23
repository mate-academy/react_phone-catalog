import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import { getBaseUrl } from '../../utils/BaseUrl';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* 1. Логотип */}
        <NavLink to="/" className={styles.logoLink}>
          <img
            src={`${getBaseUrl()}img/logo.svg`}
            alt="Product Catalog Logo"
            className={styles.logo}
          />
        </NavLink>

        {/* 2. Полезные ссылки */}
        <div className={styles.nav}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Github
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Contacts
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Rights
          </a>
        </div>

        {/* 3. Кнопка Back to top */}
        <div className={styles.backToTop}>
          <span className={styles.backToTopText}>Back to top</span>
          <button
            type="button"
            className={styles.backToTopBtn}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <img
              src={`${getBaseUrl()}/img/icons/arrow-up.svg`}
              alt="Arrow up"
              className={styles.icon}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
