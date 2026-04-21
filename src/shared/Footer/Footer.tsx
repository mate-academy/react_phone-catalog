import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../../images/Logo/logo-2x.png';
import styles from './Footer.module.scss';

interface FooterLink {
  name: string;
  url: string;
}

const links: FooterLink[] = [
  { name: 'Github', url: 'https://github.com' },
  { name: 'Contacts', url: 'https://www.linkedin.com/' },
  { name: 'Rights', url: 'https://github.com' },
];

export const Footer: React.FC = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToTop();
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.footer_block}>
          <NavLink to="/">
            <img
              src={Logo}
              alt="Nice gadgets logo"
              className={styles.footer_logo}
            />
          </NavLink>
          <nav>
            <ul className={styles.footer_list}>
              {links.map(({ name, url }) => (
                <li key={name} className={styles.footer_item}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footer_link}
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div
            className={styles.footer_toTop}
            onClick={scrollToTop}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label="Back to top"
          >
            <span className={styles.footer_toTopText}>Back to top</span>
            <span className={styles.footer_toTopLink} />
          </div>
        </div>
      </div>
    </footer>
  );
};
