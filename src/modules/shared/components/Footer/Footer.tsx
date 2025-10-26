import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__container}>
      <div className={styles.footer__items}>
        <Link to={{ pathname: '/' }} className={styles.footer__link}>
          <div className={styles.footer__logo}></div>
        </Link>

        <ul className={styles.footer__list}>
          <Link
            to={'https://github.com/Whslv'}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__item}
          >
            Github
          </Link>
          <Link
            to={'https://www.linkedin.com/in/vladislav-belenov/'}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__item}
          >
            Contacts
          </Link>
          <Link to={{ pathname: '/rights' }} className={styles.footer__item}>
            Rights
          </Link>
        </ul>

        <button
          className={styles.footer__button}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <p className={styles.button__label}>Back to top</p>
          <div className={styles.button__icon__arrowTop}></div>
        </button>
      </div>
    </div>
  </footer>
);
