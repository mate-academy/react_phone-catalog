import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
export const Footer = () => {
  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <div className={styles.wrapper}>
          <Link to="/" className={styles.link}>
            <img
              src="img/icons/logo-bottom.png"
              alt="Logo"
              className={styles.logo}
            />
          </Link>
        </div>

        <div className={styles.wrapper}>
          <nav className={styles.nav}>
            <ul className={styles.list}>
              <li className={styles.item}>
                <a
                  href="https://github.com/despair849/react_phone-catalog"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  GitHub
                </a>
              </li>
              <li className={styles.item}>
                <a
                  href="https://github.com/despair849"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  Contacts
                </a>
              </li>
              <li className={styles.item}>
                <a
                  // eslint-disable-next-line max-len
                  href="https://github.com/despair849/react_phone-catalog/blob/develop/README.md"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  Rights
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.backToTopWrapper}>
            <span className={styles.backToTop}>Back to top</span>
            <button
              className={styles.backToTopButton}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img src="img/icons/arrow-up.png" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
