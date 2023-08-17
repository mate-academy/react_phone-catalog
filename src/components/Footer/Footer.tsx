import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { ScrollBtn } from './ScrollBtn';

export const Footer = () => (
  <>
    <div className="footer__container">
      <Logo />

      <nav className="footer__nav">
        <ul className="footer__navList">
          <NavLink
            to="/github"
            className="footer__navItem"
          >
            Github
          </NavLink>

          <NavLink
            to="/contacts"
            className="footer__navItem"
          >
            Contacts
          </NavLink>

          <NavLink
            to="/rights"
            className="footer__navItem"
          >
            rights
          </NavLink>
        </ul>
      </nav>

      <div className="footer__buttonUp scrollUp">
        <ScrollBtn />
      </div>

    </div>
  </>
);
