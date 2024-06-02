import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="footer__items">
      <div className="footer__logo">
        <img
          src="./img/NiceGadgets.png"
          alt="icon"
          className="footer__icon invert"
        />
      </div>

      <nav className="footer__links">
        <NavLink
          to="/contact"
          target="_blank"
          className={({ isActive }) =>
            classNames('footer__link', { 'is-active': isActive })
          }
        >
          Contact
        </NavLink>
        <NavLink
          to="https://github.com/zvir91/react_phone-catalog"
          target="_blank"
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
          target="_blank"
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
          onClick={handleScroll}
        >
          Back to top
        </NavLink>

        <button className="footer__back-button" onClick={handleScroll}>
          <img
            src="img/Chevron(ArrowUp).png"
            alt="icon"
            className="footer__back-icon"
          />
        </button>
      </div>
    </div>
  );
};
