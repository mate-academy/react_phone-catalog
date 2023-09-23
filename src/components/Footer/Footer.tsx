import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.scss';
import { GoTop } from '../GoTop/GoTop';
import { Logo } from '../Logo/Logo';
import { linkClass } from '../../helpers/linkClass';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <Logo />
      </div>
      <div className="footer__links">
        <NavLink
          className={linkClass.footer}
          to="https://github.com/mate-academy/react_phone-catalog"
          target="_blank"
        >
          Github
        </NavLink>
        <NavLink className={linkClass.footer} to="contacts">Contacts</NavLink>
        <NavLink className={linkClass.footer} to="rights">Rights</NavLink>
      </div>
      <div className="footer__go-top">
        <GoTop />
      </div>
    </footer>
  );
};
