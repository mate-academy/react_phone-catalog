import { Link } from 'react-router-dom';
import Logo from '../../../assets/logo.svg?react';
import ArrowUpIcon from '../../../assets/icons/arrow-up.svg?react';
import styles from './Footer.module.scss';

const GITHUB_PROFILE = 'https://github.com/lucashel-design';

const FOOTER_LINKS = [
  { title: 'Github', href: `${GITHUB_PROFILE}/react_phone-catalog` },
  { title: 'Contacts', href: GITHUB_PROFILE },
  { title: 'Rights', href: `${GITHUB_PROFILE}/react_phone-catalog` },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.content}>
      <Link to="/" className={styles.logo} aria-label="Nice Gadgets home page">
        <Logo />
      </Link>

      <ul className={styles.links}>
        {FOOTER_LINKS.map(({ title, href }) => (
          <li key={title}>
            <a
              href={href}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </a>
          </li>
        ))}
      </ul>

      <button type="button" className={styles.backToTop} onClick={scrollToTop}>
        Back to top
        <span className={styles.backToTopIcon}>
          <ArrowUpIcon />
        </span>
      </button>
    </div>
  </footer>
);
