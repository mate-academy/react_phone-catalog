import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

const GITHUB_URL = 'https://github.com/bohdanokhrim/react_phone-catalog';

const footerLinks = [
  {
    label: 'GitHub',
    href: GITHUB_URL,
  },
  {
    label: 'Contacts',
    href: `${GITHUB_URL}/issues`,
  },
  {
    label: 'Rights',
    href: `${GITHUB_URL}/blob/HEAD/LICENSE`,
  },
];

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Link to="/" className={styles.logo} aria-label="Nice Gadgets home">
          <img
            src={`${import.meta.env.BASE_URL}img/logo/logo-text.svg`}
            alt="Nice Gadgets"
            className={styles.logoText}
          />

          <img
            src={`${import.meta.env.BASE_URL}img/logo/logo-icon.svg`}
            alt=""
            className={styles.logoIcon}
          />
        </Link>

        <nav className={styles.links} aria-label="Footer navigation">
          {footerLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleBackToTop}
          className={styles.backToTop}
        >
          <span>Back to top</span>

          <span className={styles.arrow} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 12V4M8 4L4.5 7.5M8 4L11.5 7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </footer>
  );
};
