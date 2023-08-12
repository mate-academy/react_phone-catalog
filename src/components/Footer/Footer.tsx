import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { BackToTopButton } from '../BackToTopButton/BackToTopButton';

import './Footer.scss';

const links = [
  {
    name: 'Github',
    to: 'https://github.com/andrii-kovalskyi02',
  },
  {
    name: 'Contacts',
    to: '/',
  },
  {
    name: 'Rights',
    to: '/',
  },
];

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <Logo />

      <ul className="footer__list">
        {links.map(({ name, to }) => (
          <li
            key={name}
            className="footer__item"
          >
            <Link
              to={to}
              className="footer__link"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>

      <BackToTopButton />
    </footer>
  );
};
