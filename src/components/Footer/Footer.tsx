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
          <a
            href="https://github.com/oberezhnay/react_phone-catalog"
            target="_blank"
          >
            Github
          </a>
        </li>
        <li className={styles['footer-item']}>
          <a
            href="https://github.com/oberezhnay/react_phone-catalog"
            target="_blank"
          >
            Contacts
          </a>
        </li>
        <li className={styles['footer-item']}>
          <a
            href="https://docs.github.com/ru/site-policy/github-terms/github-terms-of-service"
            target="_blank"
          >
            Rights
          </a>
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
