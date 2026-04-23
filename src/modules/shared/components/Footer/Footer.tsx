import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../../utils/routes';
import styles from './Footer.module.scss';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link
          to={AppRoutes.HOME}
          className={styles.logo}
          aria-label="Go to home"
        >
          <img src="/img/icons/Logo.svg" alt="Nice Gadgets logo" />
        </Link>

        <nav aria-label="Footer navigation">
          <ul className={styles.navList}>
            <li>
              <a
                href={AppRoutes.GITHUB}
                className={styles.navLink}
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <button
                className={styles.navLink}
                onClick={() => alert('Here supposed to be contacts')}
              >
                Contacts
              </button>
            </li>
            <li>
              <button
                className={styles.navLink}
                onClick={() => alert('Here supposed to be rights')}
              >
                Rights
              </button>
            </li>
          </ul>
        </nav>

        <button className={styles.backToTop} onClick={handleBackToTop}>
          Back to top
        </button>
      </div>
    </footer>
  );
};
