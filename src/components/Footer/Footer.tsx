import { Link, useLocation } from 'react-router-dom';
import Logo from 'assets/icons/logo.svg';
import Stroke from 'assets/icons/arrow.svg';
import styles from './Footer.module.scss';

const links = [
  {
    path: 'https://github.com/KarinaKoliada/react_phone-catalog',
    title: 'Github',
    external: true
  },
  { path: '/contacts', title: 'Contacts' },
  { path: '/rights', title: 'Rights' },
];

const Footer = () => {
  const location = useLocation();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_logo}>
        <Link to="/" className={styles.logo_link}>
          <img
            src={Logo}
            alt="Website logo"
            className={styles.logo_icon}
            loading="lazy"
          />
        </Link>
      </div>

      <nav aria-label="Footer navigation" className={styles.nav}>
        {links.map(link => (
          link.external ? (
            <a
              key={link.title}
              href={link.path}
              className={styles.nav_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.title.toUpperCase()}
            </a>
          ) : (
            <Link
              key={link.title}
              to={link.path}
              className={`${styles.nav_link} ${
                location.pathname === link.path ? styles.isActive : ''
              }`}
            >
              {link.title.toUpperCase()}
            </Link>
          )
        ))}
      </nav>

      <div className={styles.back}>
        <span className={styles.back_text}>Back to top</span>
        <button
          className={styles.back_btn}
          onClick={handleScrollToTop}
          aria-label="Back to top"
        >
          <img
            className={styles.back_img}
            src={Stroke}
            alt=""
            loading="lazy"
          />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
