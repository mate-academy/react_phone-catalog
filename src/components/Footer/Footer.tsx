import { Container } from '../Container';
import { Logo } from '../Logo';
import styles from './Footer.module.scss';

const navItems = [
  {
    label: 'Github',
    href: 'https://github.com/mate-academy/react_phone-catalog',
  },
  { label: 'Contacts', href: '#contacts' },
  { label: 'Rights', href: '#rights' },
];

export const Footer = () => (
  <footer className={styles.footer}>
    <Container className={styles.container}>
      <Logo />

      <nav className={styles.nav} aria-label="Footer navigation">
        {navItems.map(item => (
          <a
            key={item.label}
            href={item.href}
            className={styles.navLink}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className={styles.backToTop}>
        <button
          type="button"
          className={styles.backText}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top
        </button>
        <button
          type="button"
          className={styles.backIcon}
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <i className="fa-solid fa-chevron-up" aria-hidden />
        </button>
      </div>
    </Container>
  </footer>
);
