import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { asset } from '../../utils/asset';

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className={styles.footerContent}>
          <div>
            <Link
              to="/"
              className={styles.logoLink}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src={asset('/img/logo.png')}
                alt="Logo Nice Gadgets"
                className={styles.logo}
              />
            </Link>
          </div>
          <nav className={styles.nav}>
            <div className={styles.navLinks}>
              <a
                href="https://github.com/iryna-knyzh/react_phone-catalog"
                className={styles.navLink}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://github.com/iryna-knyzh/react_phone-catalog"
                className={styles.navLink}
                target="_blank"
                rel="noreferrer"
              >
                Contacts
              </a>
              <a
                href="https://github.com/iryna-knyzh/react_phone-catalog"
                className={styles.navLink}
                target="_blank"
                rel="noreferrer"
              >
                Rights
              </a>
            </div>
          </nav>
          <div className={styles.back}>
            <a
              className={styles.backLink}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to top
              <div className={styles.backIconBlock}>
                <img
                  src={asset('/img/icons/arrow-up.png')}
                  className={styles.backIconImg}
                ></img>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
