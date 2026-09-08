import { NavLink } from 'react-router-dom';
import { Logo } from '../shared/Logo';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <Logo />
        <nav className={styles.footer__nav}>
          <ul className={styles.menu}>
            <li className={styles.menu__item}>
              <NavLink to="/" className={styles.menu__link}>
                Github
              </NavLink>
            </li>
            <li className={styles.menu__item}>
              <NavLink to="/" className={styles.menu__link}>
                Contacts
              </NavLink>
            </li>
            <li className={styles.menu__item}>
              <NavLink to="/" className={styles.menu__link}>
                rights
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.backToTop}>
          <div className={styles.backToTop__text}>Back to top</div>

          <button
            className={styles.backToTop__btn}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          ></button>
        </div>
      </div>
    </footer>
  );
};
