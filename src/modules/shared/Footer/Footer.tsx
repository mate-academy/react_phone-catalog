import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/img/Logo/Logo.png';
import styles from './Footer.module.scss';

const links = [
  { name: 'Github', url: 'https://github.com/Ellworts' },
  { name: 'Contacts', url: 'https://www.linkedin.com/in/ellworts/' },
  { name: 'Rights', url: 'https://mykhailoportfolio.vercel.app/' },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.footer_block}>
          <NavLink to="/">
            <img src={logo} alt="logo" className={styles.footer_logo} />
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
          <div className={styles.footer_toTop}>
            <span className={styles.footer_toTopText} onClick={scrollToTop}>
              Back to top
            </span>
            <span
              className={styles.footer_toTopLink}
              onClick={scrollToTop}
              role="button"
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  scrollToTop();
                }
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
