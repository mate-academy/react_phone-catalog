import { FooterLinks } from '@/molecules';

import s from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { Section, Logo, Button } from '@/atoms';

import Chevron from '@/assets/icons/chevron.svg?react';

const Footer = () => {
  return (
    <Section as="footer" unstyled className={s.footer}>
      <Section.Title as="h2" className={s.visuallyHidden}>
        Footer navigation
      </Section.Title>

      <div className={s.footer__nav}>
        <Logo />
        <FooterLinks />

        <div className={s.goUp}>
          <label className={s.goUp__label} htmlFor="goUp">
            Back to top
          </label>
          <Link id="goUp" to="/" className={s.goUp__button}>
            <Button id="goUp">
              <Chevron className={s.goUp__icon} />
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default Footer;
