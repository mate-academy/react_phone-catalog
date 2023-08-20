import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { ScrollBtn } from './ScrollBtn';

const gitHubLink = 'https://github.com/Ir-ra/react_phone-catalog';

export const Footer = () => (
  <>
    <div className="footer__container">
      <Logo />

      <nav className="footer__nav">
        <ul className="footer__navList">
          <NavLink
            to={gitHubLink}
            className="footer__navItem"
            target="_blank"
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
