import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import { BackToTopButton } from '../BackToTopButton/BackToTopButton';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.containerLogo}>
        <img src="/img/Logo.svg" alt="Logo" />
      </div>

      <nav className={styles.nav}>
        <a
          href="https://github.com/AlbinaAlbi/react_phone-catalog"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <NavLink to={'/Contacts'}>Contacts</NavLink>
        <NavLink to={'/rights'}>rights</NavLink>
      </nav>

      <BackToTopButton />
    </div>
  );
};
