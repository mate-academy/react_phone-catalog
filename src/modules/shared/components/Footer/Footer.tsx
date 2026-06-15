import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const goUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <Link to={'/'} className={styles.logoLink}>
        <img src="img/logo/logo.svg" alt="logo" />
      </Link>
      <nav className={styles.nav}>
        <a
          className={styles.navLink}
          href="https://github.com/Yevhen-Srdk/react_phone-catalog"
        >
          GITHUB
        </a>
        <a className={styles.navLink} href="mailto:yevhen.srdk@gmail.com">
          CONTACTS
        </a>
        <a className={styles.navLink} href="#">
          RIGHTS
        </a>
      </nav>
      <div className={styles.goToTop}>
        <span onClick={goUp} className={styles.btnLabel}>
          Back to top
        </span>
        <button onClick={goUp} className={styles.btn} name="btn">
          <img
            className={styles.btnImg}
            src="icons/chevron-arrow-up.svg"
            alt="up"
          />
        </button>
      </div>
    </footer>
  );
};
