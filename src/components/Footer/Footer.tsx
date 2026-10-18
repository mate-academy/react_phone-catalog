import { Container } from '../Container';
import { Icon } from '../Icon';
import { Logo } from '../Logo';
import styles from './Footer.module.scss';

const REPOSITORY_URL = 'https://github.com/Zakys1d/react_phone-catalog';

const LINKS = [
  { label: 'GitHub', href: REPOSITORY_URL },
  { label: 'Contacts', href: 'https://github.com/Zakys1d' },
  { label: 'Rights', href: `${REPOSITORY_URL}/blob/master/LICENSE` },
];

export const Footer = () => (
  <footer className={styles.footer}>
    <Container>
      <div className={styles.footer__content}>
        <div className={styles.footer__logo}>
          <Logo />
        </div>

        <nav className={styles.footer__links}>
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={styles.footer__link}
              target="_blank"
              rel="noreferrer"
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={styles.footer__top}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top
          <span className={styles['footer__top-icon']}>
            <Icon name="arrow-up" />
          </span>
        </button>
      </div>
    </Container>
  </footer>
);
