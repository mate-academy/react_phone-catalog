import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import { getPublicPath } from '../../utils/getPublicPath';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <NavLink to="/" className={styles.footerLogo}>
        <img
          className={styles.footerLogoIcon}
          src={getPublicPath('/img/Logo.jpg')}
          alt="Logo"
        />
      </NavLink>

      <nav className={styles.footerLinks}>
        <NavLink
          to="https://github.com/Nika-Andriy"
          className={styles.footerLink}
        >
          Github
        </NavLink>
        <NavLink
          to="https://github.com/Nika-Andriy"
          className={styles.footerLink}
        >
          Contacts
        </NavLink>
        <NavLink
          to="https://github.com/Nika-Andriy"
          className={styles.footerLink}
        >
          rights
        </NavLink>
      </nav>

      <div className={styles.footerBackToTop}>
        <span
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={styles.footerBackToTopText}
        >
          Back to top
        </span>
        <button
          className={styles.footerBackToTopButton}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            className={styles.footerBackToTopButtonArrow}
            src={getPublicPath('img/footer-button-arrow.png')}
            alt="arrow"
          />
        </button>
      </div>
    </footer>
  );
};
