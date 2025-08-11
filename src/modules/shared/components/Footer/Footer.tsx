import React from 'react';
import footerClass from './footer.module.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { IconEnum } from '../../../../types/iconsType';
import { IconButton } from '../IconButton';
import { PagesType } from '../../../../types/PagesType';

const footerLinks = [
  {
    to: 'https://github.com/LirikTop/react_phone-catalog?tab=readme-ov-file',
    label: 'github',
  },
  {
    to: '',
    label: 'contacts',
  },
  {
    to: '',
    label: 'rights',
  },
];

export const Footer: React.FC = React.memo(() => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={cn(footerClass.footer)}>
      <div className={cn(footerClass.footer__content, 'container')}>
        <div className={cn(footerClass['footer__logo-wraper'])}>
          <Link
            className={cn(footerClass['footer__logo-link'])}
            to={PagesType.home}
          >
            <img
              src="img/Logo.png"
              alt="image logo"
              loading="lazy"
              className={cn(footerClass.footer__logo)}
            />
          </Link>
        </div>
        <div className={cn(footerClass.footer__links)}>
          {footerLinks.map(({ to, label }) => (
            <Link
              to={to}
              key={label}
              className={cn(footerClass.footer__link)}
              target="_blank"
            >
              {label}
            </Link>
          ))}
        </div>
        <div
          className={cn(footerClass['footer__top-button'])}
          onClick={scrollToTop}
        >
          <p className={cn(footerClass['footer__top-button-text'])}>
            Back to top
          </p>
          <div className={cn(footerClass['footer__top-button-icon'])}>
            <IconButton iconName={IconEnum.arrow} />
          </div>
        </div>
      </div>
    </div>
  );
});

Footer.displayName = 'Footer';
