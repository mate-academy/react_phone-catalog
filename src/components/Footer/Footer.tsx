import { Link, useLocation } from 'react-router-dom';
import Logo from 'assets/icons/logo.svg';
import Stroke from 'assets/icons/arrow.svg';
import styles from './Footer.module.scss';

const links = [
  { path: '', title: 'Github' },
  { path: '/contacts', title: 'Contacts' },
  { path: '/rights', title: 'Rights' },
];

const Footer = () => {
  const location = useLocation();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_logo}>
        <Link to="/" className={styles.logo_link}>
          <img src={Logo} alt="logo" className={styles.logo_icon} />
        </Link>
      </div>
      <nav aria-label="Footer navigation" className={styles.nav}>
        {links.map(link => (
          <Link
            key={link.title}
            to={link.path}
            className={`${styles.nav_link} ${location.pathname === link.path ? styles.isActive : ''}`}
          >
            {link.title.toUpperCase()}
          </Link>
        ))}
      </nav>
      <div className={styles.back}>
        <span className={styles.back_text}>Back to top</span>
        <button
          className={styles.back_btn}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img className={styles.back_img} src={Stroke} alt="Back to top" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
