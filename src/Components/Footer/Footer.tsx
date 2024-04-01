import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => (
  <div className="footer__items">
    <div className="footer__logo">
      <img src="./img/Logo.jpg" alt="icon" className="footer__icon" />
    </div>

    <nav className="footer__links">
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          classNames('footer__link', { 'is-active': isActive })
        }
      >
        Contact
      </NavLink>
      <NavLink
        to="https://github.com/zvir91/react_phone-catalog"
        className={({ isActive }) =>
          classNames('footer__link', { 'is-active': isActive })
        }
      >
        Github
      </NavLink>
      <NavLink
        to="/rights"
        className={({ isActive }) =>
          classNames('footer__link', { 'is-active': isActive })
        }
      >
        Rights
      </NavLink>
    </nav>

    <div className="footer__back">
      <NavLink
        to="/"
        className={({ isActive }) =>
          classNames('footer__link-back', { 'is-active': isActive })
        }
      >
        Back to top
      </NavLink>

      <button className="footer__back-button">
        <img
          src="./img/Vector (Stroke).jpg"
          alt="icon"
          className="footer__back-icon"
        />
      </button>
    </div>
  </div>
);
