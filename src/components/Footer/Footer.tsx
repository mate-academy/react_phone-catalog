import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { FooterNav } from '../../types/FooterNav';

export const Footer = () => {
  return (
    <footer>
      <div className={styles.content}>
        <Link to="/" className={styles.logo}>
          <img
            className={styles.img}
            src="/img/Logo.png"
            alt="Nice gadgets logo"
          />
        </Link>

        <ul className={styles.navList}>
          {Object.entries(FooterNav).map(([key, value]) => (
            <li key={key} className={styles.navItem}>
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                {key.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={styles.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span>Back to top</span>

          <img src="/img/icons/back-to-top.svg" alt="Arrow up" />
        </button>
      </div>
    </footer>
  );
};
