import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.logoLink}>
        <img src="../../img/Logo.svg" alt="Nice Gadgets logo" />
      </Link>

      <nav className={styles.nav}>
        <Link
          to="https://github.com/roman-tarasov90/react_phone-catalog"
          target="_blank"
          className={styles.navBtn}
          rel="noreferrer"
        >
          Github
        </Link>
        <Link to="#" className={styles.navBtn}>
          Contacts
        </Link>
        <Link to="#" className={styles.navBtn}>
          rights
        </Link>
      </nav>

      <div className={styles.backToTopPanel}>
        <div className={styles.backToTopLabel}>Back to top</div>
        <Link to="#" className={styles.backToTopBtn}></Link>
      </div>
    </footer>
  );
};
