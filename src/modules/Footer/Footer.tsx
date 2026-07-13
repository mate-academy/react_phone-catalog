import { Logo } from '../../components/Logo';
import styles from './Footer.styles.module.scss';
import IconArrowUp from '../../assets/icons/arrowUp.svg?react';

const footerLinks = [
  {
    href: 'https://github.com/nikassafronovs',
    label: 'GITHUB',
  },
  {
    href: 'https://example.com/contacts',
    label: 'CONTACTS',
  },
  {
    href: 'https://example.com/rights',
    label: 'RIGHTS',
  },
];

export const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <Logo />

        <nav className={styles.nav}>
          {footerLinks.map(link => (
            <a key={link.href} href={link.href} className={styles.footerLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.backToTop}>
          <span className={styles.backText}>Back to top</span>

          <button
            type="button"
            className={styles.backToUp}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          >
            <IconArrowUp />
          </button>
        </div>
      </footer>
    </>
  );
};
