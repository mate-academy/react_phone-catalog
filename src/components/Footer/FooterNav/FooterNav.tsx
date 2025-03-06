import React from 'react';
import footerNavStyles from './FooterNav.module.scss';
import { ROUTES } from '../../../constants/routes';
import { Link } from 'react-router-dom';

const navLinks = [
  {
    link: 'https://github.com/MrZefirchk/react_phone-catalog',
    title: 'GitHub',
  },
  {
    link: ROUTES.HOME,
    title: 'Contacts',
  },
  {
    link: ROUTES.HOME,
    title: 'Rights',
  },
];

export const FooterNav = () => {
  return (
    <nav className={footerNavStyles.nav}>
      <ul className={footerNavStyles.nav__menu}>
        {navLinks.map(({ link, title }) => (
          <li className={footerNavStyles.nav__item} key={title}>
            <Link to={link} className={footerNavStyles.nav__link}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
