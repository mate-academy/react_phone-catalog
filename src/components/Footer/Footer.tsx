import { Link, useNavigate } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  //#region handlefunctions
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  //#endregion
  const navigation = useNavigate();

  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.logo}>
        <img src="./img/logo/logo.png" alt="Nice Gadgets Logo" />
      </Link>
      <ul className={styles.list}>
        <li className={styles.listContent}>
          <a
            href="https://github.com/shtoikoihor"
            target="_blank"
            rel="noreferrer"
            className={styles.listLink}
          >
            Github
          </a>
        </li>
        <li className={styles.listContent}>
          <a
            href="https://www.linkedin.com/in/ihorshtoikodev/"
            target="_blank"
            rel="noreferrer"
            className={styles.listLink}
          >
            Contacts
          </a>
        </li>
        <li className={styles.listContent}>
          {' '}
          <a
            onClick={() => navigation('/rights')}
            target="_blank"
            rel="noreferrer"
            className={styles.listLink}
          >
            Rights
          </a>
        </li>
      </ul>

      <button
        type="button"
        onClick={handleScrollTop}
        className={styles.backToTop}
      >
        <span className={styles.backToTopText}>Back to top</span>
        <span className={styles.backToTopCircle}>
          <img src="./img/icons/button_top_icon.svg" alt="" />
        </span>
      </button>
    </footer>
  );
};
