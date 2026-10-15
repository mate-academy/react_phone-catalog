import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer__content}>
          <Link className={styles.footer__logo} to="/">
            <img
              className={styles.footer__logo_img}
              src="img/logo/Logo.svg"
              alt="Nice Gadgets Logo"
            />
          </Link>

          <nav className={styles.nav}>
            <ul className={styles.nav__list}>
              <li className={styles.nav__item}>
                <Link
                  to="https://github.com/vladyslav-kukhar/react_phone-catalog"
                  className={styles.nav__link}
                >
                  Github
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link
                  to="https://github.com/vladyslav-kukhar"
                  className={styles.nav__link}
                >
                  Contacts
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link
                  to="https://github.com/mate-academy/react_phone-catalog"
                  className={styles.nav__link}
                >
                  Rights
                </Link>
              </li>
            </ul>
          </nav>

          <button className={styles.footer__btn} onClick={scrollToTop}>
            Back to top
            <span className={styles.footer__btn_icon}></span>
          </button>
        </div>
      </div>
    </footer>
  );
};
