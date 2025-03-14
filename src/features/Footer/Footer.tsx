import { Link, NavLink } from 'react-router-dom';
// import '../../styles/mixins.scss';
import styles from './Footer.module.scss';
import { BackToTop } from './BackToTop';
import logo from '/img/Logo.svg';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="page-container">
        <div className={styles.footer__content}>
          <NavLink to="/" className={styles.navbarBrand}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </NavLink>
          <div className={styles.links}>
            <Link to="">Github</Link>
            <Link to="">Contacts</Link>
            <Link to="">Rights</Link>
          </div>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
};
