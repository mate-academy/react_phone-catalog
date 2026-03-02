import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
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
        <li className={styles.list__item}>
          <a
            className={styles.list__link}
            href="https://github.com/Vitaligna"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
        </li>

        <li className={styles.list__item}>
          <Link className={styles.list__link} to="/phones">
            phones
          </Link>
        </li>

        <li className={styles.list__item}>
          <Link className={styles.list__link} to="/tablets">
            tablets
          </Link>
        </li>

        <li className={styles.list__item}>
          <Link className={styles.list__link} to="/accessories">
            accessories
          </Link>
        </li>
      </ul>

      <div className={styles.scrollBack}>
        <p className={styles.scrollBack__paragraph}>Back to top</p>
        <Button onClick={handleBackToTop} rotation={270} />
      </div>
    </footer>
  );
};
