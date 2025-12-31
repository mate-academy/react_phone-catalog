import FooterLinks from '@/molecules/FooterLinks';

import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

import ArrowUpIcon from '@/assets/icons/ArrowUp.svg?react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__nav}>
        <Link className={styles.logo} to="/">
          <div className={styles.logo__img} />
        </Link>
        <FooterLinks />

        <div className={styles.goUp}>
          <label className={styles.goUp__label} htmlFor="goUp">
            Back to top
          </label>
          <Link id="goUp" to="/" className={styles.goUp__button}>
            <ArrowUpIcon className={styles.goUp__icon} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
