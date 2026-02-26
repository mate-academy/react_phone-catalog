import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <span>NICE🔥</span>
          <span>GADGETS</span>
        </NavLink>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <a
                href="https://github.com/SerhiyDmytruk/"
                className={styles.navLink}
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <NavLink to="/contacts" className={styles.navLink}>
                Contacts
              </NavLink>
            </li>
            <li>
              <NavLink to="/rights" className={styles.navLink}>
                Rights
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.backToTop}>
          <span className={styles.backToTopText}>Back to top</span>
          <button
            type="button"
            className={styles.backToTopBtn}
            onClick={handleBackToTop}
          >
            <i className="fas fa-chevron-up" />
          </button>
        </div>
      </div>
    </footer>
  );
};
