import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { BackToTopButton } from '../BackToTopButton/BackToTopButton';
import { footerLinks } from '../../utils/footerLinks';

import './Footer.scss';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <Logo />

      <ul className="footer__list">
        {footerLinks.map(({ name, to }) => (
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
