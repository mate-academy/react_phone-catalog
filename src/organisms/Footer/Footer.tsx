import FooterLinks from '@/molecules/FooterLinks';

import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import Section from '@/atoms/Section';
import Logo from '@/atoms/Logo';

import Chevron from '@/assets/icons/chevron.svg?react';
import Button from '@/atoms/Button';

const Footer = () => {
  return (
    <Section as="footer" unstyled className={styles.footer}>
      <Section.Title as="h2" className={styles.visuallyHidden}>
        Footer navigation
      </Section.Title>

      <div className={styles.footer__nav}>
        <Logo />
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
    </Section>
  );
};

export default Footer;
