import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__content}>
          <Link className={styles['footer__logo-link']} to="/">
            <img
              className={styles.footer__logo}
              src="./img/icons/logo.svg"
              alt="Nice Gadgets logo"
            />
          </Link>
          <nav className="footer__nav">
            <ul className={styles.footer__list}>
              <li className="footer__item">
                <a className={styles.footer__link} href="#">
                  Github
                </a>
              </li>
              <li className="footer__item">
                <a className={styles.footer__link} href="#">
                  Contacts
                </a>
              </li>
              <li className="footer__item">
                <a className={styles.footer__link} href="#">
                  Rights
                </a>
              </li>
            </ul>
          </nav>
          <div className={styles['footer__go-back']}>
            <button className={styles['footer__go-back-link']} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Back to top
            </button>
            <button className={styles['footer__go-back-btn']} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img
                className="footer__go-back-img"
                src="./img/icons/arrow-up.svg"
                alt="Arrow Up"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
