import styles from './Footer.module.scss';
import Logo from '../Logo/index';
import { Link } from 'react-router-dom';

type Props = {
  onBackToTop: () => void;
};

export const Footer: React.FC<Props> = ({ onBackToTop }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.topBarMobile}>
          <div>
            <Logo />
            <div>
              <a
                href="https://github.com/"
                className={styles.footer__github}
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
              <Link to="/contacts" className={styles.footer__contacts}>
                Contacts
              </Link>
              <Link to="/rights" className={styles.footer__rights}>
                rights
              </Link>
            </div>
            <button
              className={styles.footer__backToTop}
              type="button"
              onClick={onBackToTop}
            >
              Back to top
            </button>
          </div>
        </div>
        <div className={styles.topBar}>
          <Logo />

          <a
            href="https://github.com/"
            className={styles.footer__github}
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <Link to="/contacts" className={styles.footer__contacts}>
            Contacts
          </Link>
          <Link to="/rights" className={styles.footer__rights}>
            rights
          </Link>
          <button
            className={styles.footer__backToTop}
            type="button"
            onClick={onBackToTop}
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};
