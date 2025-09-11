import styles from './Footer.module.scss';
import TopBarStyles from '../topbar/TopBar.module.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Footer__content}>
        <Link
          to="/"
          className={`${TopBarStyles.icon} ${TopBarStyles['icon--logo']} ${TopBarStyles['icon--footerLogo']}`}
        ></Link>

        <nav className={styles.Footer__nav}>
          <ul className={styles.Footer__list}>
            <li className={styles.Footer__item}>
              <a
                href="https://github.com/viktoriamyhailiak/react_phone-catalog"
                className={styles.Footer__link}
              >
                Github
              </a>
            </li>
            <li className={styles.Footer__item}>
              <Link to="/contacts" className={styles.Footer__link}>
                Contacts
              </Link>
            </li>
            <li className={styles.Footer__item}>
              <Link to="/contacts" className={styles.Footer__link}>
                Rights
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.Footer__navToTop}>
          <a href="/" className={styles.Footer__toTopLink}>
            Back to top
          </a>
          <a href="/" className={styles.Footer__arrowUp}></a>
        </div>
      </div>
    </footer>
  );
};
