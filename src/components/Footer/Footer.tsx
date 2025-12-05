import { Link, NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => (
  <div>
    <footer className={styles.footer}>
      <NavLink to="/" className={styles.logo}>
        <img src="img/logo/Logo.svg" alt="Nice gadgets logo" />
      </NavLink>

      <ul className={styles['footer-list']}>
        <li className={styles['footer-item']}>
          <Link to="https://github.com/oberezhnay/react_phone-catalog">
            Github
          </Link>
        </li>
        <li className={styles['footer-item']}>
          <Link to="https://github.com/oberezhnay/react_phone-catalog">
            Contacts
          </Link>
        </li>
        <li className={styles['footer-item']}>
          <Link to="https://github.com/oberezhnay/react_phone-catalog">
            Rights
          </Link>
        </li>
      </ul>

      <div className={styles['back-to-top']}>
        <p className={styles.text}>Back to top</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="img/icons/ChevronArrowUp.svg" alt="Back to top" />
        </button>
      </div>
    </footer>
  </div>
);
