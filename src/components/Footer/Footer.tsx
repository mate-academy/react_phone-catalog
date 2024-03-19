import { NavLink } from 'react-router-dom';

import './footer.scss';

import arrowUp from '../../img/arrow_up.svg';
import logoIcon from '../../img/logo.png';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <NavLink to="/" className="footer__logo">
          <img src={logoIcon} alt="logoivon" />
        </NavLink>

        <nav className="footer__nav">
          <a
            href="https://github.com/Daniil-Lilin"
            className="footer__nav-link"
            target="blank"
          >
            GitHub
          </a>
          <a
            href="https://github.com/Daniil-Lilin"
            className="footer__nav-link"
            target="blank"
          >
            Contacts
          </a>
          <a
            href="https://github.com/Daniil-Lilin"
            className="footer__nav-link"
            target="blank"
          >
            Rights
          </a>
        </nav>

        <button
          type="button"
          className="footer__button btn-arrows"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img className="footer__icon" src={arrowUp} alt="arrow" />
        </button>
      </div>
    </footer>
  );
};
