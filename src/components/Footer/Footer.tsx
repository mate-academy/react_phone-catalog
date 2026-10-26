import { LogoVariants } from 'src/types/Types';
import { Logo } from '../ui/Logo/Logo';
import styles from './Footer.module.scss';
import ArrowUp from '/public/icons/chevron-arrow-up.svg?react';
import { scrollToTop } from 'src/utils/utils';

const links = [
  { to: 'https://github.com/', text: 'Github' },
  { to: 'https://www.instagram.com/', text: 'Contacts' },
  { to: 'https://rights.com/', text: 'Rights' },
];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Logo
        className={styles.logo}
        to="/"
        onClick={() => {
          scrollToTop();
        }}
        variant={LogoVariants.footer}
      />

      <ul className={styles.linksList}>
        {links.map(link => (
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            key={link.text}
            href={link.to}
          >
            {link.text}
          </a>
        ))}
      </ul>

      <button
        onClick={() => {
          scrollToTop('smooth');
        }}
        className={styles.backToTop}
      >
        Back to top
        <ArrowUp />
      </button>
    </footer>
  );
};
