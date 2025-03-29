import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import { BackToTopButton } from '../BackToTopButton';

export const Footer = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/img/icons/logo-icon.svg`;

  return (
    <footer className={styles.footer}>
      <NavLink to="/" className={styles.logo}>
        <img src={logoUrl} alt="Logo" className={styles.logoImg} />
      </NavLink>

      <nav className={styles.nav}>
        <div className={styles.navList}>
          <NavLink
            to="https://github.com/VKonoplianyi"
            className={styles.navLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </NavLink>
          <NavLink to="/contacts" className={styles.navLink}>
            Contacts
          </NavLink>
          <NavLink to="/rights" className={styles.navLink}>
            Rights
          </NavLink>
        </div>
      </nav>

      <BackToTopButton />
    </footer>
  );
};
