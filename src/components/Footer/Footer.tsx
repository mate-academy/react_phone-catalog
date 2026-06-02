import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

import logo from '../../modules/shared/icons/header/Logo.png';
import arrow from '../../modules/shared/icons/header/arrowup.png';

export const Footer = () => {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <NavLink to="/">
          <img src={logo} alt="Logo" className={styles.logo} />
        </NavLink>
        <nav className={styles.nav}>
          <NavLink to="/github" className={styles.link}>
            Github
          </NavLink>
          <NavLink to="/contact" className={styles.link}>
            Contacts
          </NavLink>
          <NavLink to="/rights" className={styles.link}>
            Rights
          </NavLink>
        </nav>

        <button onClick={handleScrollTop} className={styles.topButton}>
          Back to top <img src={arrow} alt="arrowup" className={styles.arrow} />
        </button>
      </div>
    </footer>
  );
};
