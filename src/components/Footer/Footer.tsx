import { asset } from '../../utils/paths';
import styles from './Footer.module.scss';
import { NavLink } from 'react-router-dom';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <NavLink to="/" className={`${styles.footerLogo}`}>
          <img
            src={asset('/img/icons/Logo.svg')}
            alt="logo"
            className={styles.footerLogoImg}
          />
        </NavLink>

        <nav className={styles.links}>
          <a
            href="https://github.com/your-username/product-catalog"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>

          <a href="/">Contacts</a>

          <a href="/">Rights</a>
        </nav>

        <div className={styles.backToTop}>
          <span className={styles.backToTopText}>Back to top</span>

          <button
            type="button"
            className={styles.backToTopButton}
            onClick={handleBackToTop}
            aria-label="Back to top"
          >
            <span className={styles.arrow}></span>
          </button>
        </div>
      </div>
    </footer>
  );
};
