import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import { FooterMobile } from '../FooterMobile/FooterMobile';

export const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <NavLink to="/">
          <img src="/img/icons/logo.svg" alt="Logo" />
        </NavLink>

        <nav className={styles.navigation}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <NavLink to="https://github.com/Ivan7457/react_phone-catalog">
                GitHab
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to="/contacts">Contacts</NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to="/rights">Rights</NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            className={styles.backToTop}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top
            <img src="/img/icons/arrow-up.svg" alt="Arrow Up" />
          </button>
        </div>
      </footer>

      <div className={styles.footerMobile}>
        <FooterMobile />
      </div>
    </>
  );
};
