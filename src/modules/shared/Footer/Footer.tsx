import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

import logoMobile1x from '@/assets/images/nice-gadgets-logo-mobile.png';
import logoMobile2x from '@/assets/images/nice-gadgets-logo-mobile@2x.png';
import logoDesktop1x from '@/assets/images/nice-gadgets-logo-desktop.png';
import logoDesktop2x from '@/assets/images/nice-gadgets-logo-desktop@2x.png';
import iconChevron from '@/assets/icons/icon-chevron.svg';

type NavLink = {
  href: string;
  label: string;
  external: boolean;
};

const navLinks: NavLink[] = [
  { href: 'https://github.com/nicegadgets', label: 'Github', external: true },
  { href: '/contacts', label: 'Contacts', external: false },
  { href: '/rights', label: 'Rights', external: false },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Link to="/" aria-label="Go to homepage">
          <picture>
            <source
              media="(min-width: 640px)"
              srcSet={`${logoDesktop1x} 1x, ${logoDesktop2x} 2x`}
            />
            <img
              className={styles.logoImage}
              src={logoMobile1x}
              srcSet={`${logoMobile2x} 2x`}
              alt="Nice Gadgets logo"
            />
          </picture>
        </Link>
      </div>

      <nav className={styles.nav} aria-label="Footer navigation">
        {navLinks.map(({ href, label, external }) =>
          external ? (
            <a
              key={label}
              href={href}
              className={styles.navLink}
              target="_blank"
              rel="noreferrer"
            >
              {label}
            </a>
          ) : (
            <Link key={label} to={href} className={styles.navLink}>
              {label}
            </Link>
          ),
        )}
      </nav>

      <div className={styles.backToTop}>
        <span className={styles.backToTopText}>Back to top</span>
        <button
          type="button"
          className={styles.backToTopButton}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <img src={iconChevron} alt="" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
};
