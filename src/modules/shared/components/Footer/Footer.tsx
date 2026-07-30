import { Logo } from '@/components/Logo';
import { Icon } from '@/components/Icon';
import styles from './Footer.module.scss';

const REPO_URL = 'https://github.com/mate-academy/react_phone-catalog';

const links = [
  { label: 'Github', href: REPO_URL },
  { label: 'Contacts', href: '/' },
  { label: 'Rights', href: '/' },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.content}>
      <Logo />

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href === REPO_URL ? '_blank' : undefined}
                rel={href === REPO_URL ? 'noopener noreferrer' : undefined}
                className={styles.navLink}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.backToTop}>
        <span className={styles.backToTopLabel}>Back to top</span>
        <button
          type="button"
          className={styles.backToTopButton}
          aria-label="Back to top"
          onClick={scrollToTop}
        >
          <Icon name="chevron-up" />
        </button>
      </div>
    </div>
  </footer>
);
