import { Container } from '../Container';
import { Icon } from '../Icon';
import { Logo } from '../Logo';
import styles from './Footer.module.scss';

// TODO: replace with your own links
const GITHUB_URL = 'https://github.com/';
const CONTACTS_URL = 'mailto:hello@nicegadgets.example';
const RIGHTS_URL = 'https://github.com/';

const LINKS = [
  { href: GITHUB_URL, label: 'Github' },
  { href: CONTACTS_URL, label: 'Contacts' },
  { href: RIGHTS_URL, label: 'Rights' },
];

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <Logo className={styles.logo} />

        <nav className={styles.links} aria-label="Footer">
          {LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className={styles.link}
              target="_blank"
              rel="noreferrer"
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={styles.backToTop}
          onClick={handleBackToTop}
        >
          <span>Back to top</span>
          <span className={styles.backIcon}>
            <Icon name="chevron-up" />
          </span>
        </button>
      </Container>
    </footer>
  );
};
