import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

const navLinks = [
  { id: 1, title: 'github', to: 'https://github.com/Yuliia-Fil/' },
  { id: 2, title: 'contacts', to: '/' },
  { id: 3, title: 'rights', to: '/' },
];

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <NavLink style={{ width: '33%' }} to="/">
          <img src="/img/Logo.svg" alt="Nice_Gadgets_logo" />
        </NavLink>
        <nav style={{ width: '33%' }}>
          <ul className={styles.navList}>
            {navLinks.map(link => (
              <li key={link.id}>
                <a
                  target="_blank"
                  href={link.to}
                  rel="noreferrer"
                  className={styles.navLink}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.toTop}>
          <span className={styles.toTopTitle}>Back to top</span>
          <button className={styles.toTopButton} onClick={scrollToTop}>
            <img src="/img/icons/arrow-top.svg" alt="to_top" />
          </button>
        </div>
      </div>
    </footer>
  );
};
