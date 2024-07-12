import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrolTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.nav__logo}>
          <Link className={styles.nav__img} to="/">
            <img
              className={styles.nav__img}
              src={`${'https://allaserhiienko.github.io/react_phone-catalog//img/icons/logo.svg'}`}
              alt="Logo"
            />
          </Link>
        </div>

        <ul className={styles.nav}>
          <li className={styles.nav__item}>
            <a
              href="https://github.com/mukutiuk"
              className={styles.nav__link}
              target="blanc"
            >
              GITHUB
            </a>
          </li>

          <li className={styles.nav__item}>
            <a href="" className={styles.nav__link}>
              CONTACTS
            </a>
          </li>
          <li className={styles.nav__item}>
            <a href="" className={styles.nav__link}>
              RIGHTS
            </a>
          </li>
        </ul>

        <div className={styles.footer__return}>
          <span className={styles.footer__hint}></span>
          <button onClick={scrolTop} className={styles.footer__img}>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};
