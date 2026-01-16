import FooterLinks from '@/molecules/FooterLinks';

import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

import Chevron from '@/assets/icons/chevron.svg?react';
import Button from '@/atoms/Button';

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
            <Button id="goUp">
              <Chevron className={styles.goUp__icon} />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
