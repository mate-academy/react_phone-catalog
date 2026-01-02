import { Link, NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className={styles.footerContent}>
          <div>
            <Link
              to="/"
              className={styles.logoLink}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="/img/logo.png"
                alt="Logo Nice Gadgets"
                className={styles.logo}
              />
            </Link>
          </div>
          <nav className={styles.nav}>
            <div className={styles.navLinks}>
              <NavLink to="/" className={styles.navLink}>
                GitHub
              </NavLink>
              <NavLink to={{ pathname: '/phones' }} className={styles.navLink}>
                Contacts
              </NavLink>
              <NavLink to={{ pathname: '/tablets' }} className={styles.navLink}>
                Rights
              </NavLink>
            </div>
          </nav>
          <div className={styles.back}>
            <a href="#" className={styles.backLink}>
              Back to top
              <div className={styles.backIconBlock}>
                <img
                  src="/img/icons/arrow-up.png"
                  className={styles.backIconImg}
                ></img>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
