import React from 'react';
import styles from './Footer.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { footerItems } from './constants';
import { Button } from '../Button';
import { getAssetUrl } from '../../api/utilis';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Link to="/" aria-label="main page">
          <img
            className={styles.logo__img}
            src={getAssetUrl('icons/logo.svg')}
            alt="phone shop logo"
          />
          <img
            className={styles.logo__hand}
            src={getAssetUrl('icons/logo_ok_hand.svg')}
            alt=""
            aria-hidden="true"
          />
        </Link>
      </div>
      <ul className={styles.list}>
        <li>
          <a
            className={styles.list__link}
            href="https://github.com/rkoltunov"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            github
          </a>
        </li>
        {footerItems.map(item => (
          <li key={item} className={styles.list__item}>
            <NavLink to={`/${item}`} className={styles.list__link}>
              {item}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={styles.scrollBack}>
        <p className={styles.scrollBack__paragraph}>Back to top</p>
        <Button onClick={handleBackToTop} rotation={270} />
      </div>
    </footer>
  );
};
