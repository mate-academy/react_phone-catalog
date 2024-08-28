import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { ArrowIcon } from '../../components/Icons/ArrowIcon';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <Link to="/">
          <img src="img/logo.svg" alt="logo" className={styles.footer__logo} />
        </Link>
        <div className={styles.footer__links}>
          <a
            href="https://github.com/NastyaSid"
            target="_blank"
            className={`${styles.footer__linksItem} text-uppercase`}
            rel="noreferrer"
          >
            Github
          </a>
          <a href="#" className={`${styles.footer__linksItem} text-uppercase`}>
            Contacts
          </a>
          <a href="#" className={`${styles.footer__linksItem} text-uppercase`}>
            Rights
          </a>
        </div>
        <div className={styles.footer__back}>
          <p className="text-small">Back to top</p>
          <button
            className={styles.footer__backBtn}
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </footer>
  );
};
